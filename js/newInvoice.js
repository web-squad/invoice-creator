let logoSrc;
let addNewItemCount = 1;
let currentHighestItemIndex = 1;
let itemIds = new Array([1]);

window.onload = function () { 
    let saveButton = document.getElementById("save");
    saveButton.addEventListener("click", handleSaveClick);

    let priceChange = document.getElementById("price");
    priceChange.addEventListener("change", handlePriceOrAmountChange);

    let amountChange = document.getElementById("amount");
    amountChange.addEventListener("change", handlePriceOrAmountChange);

    let taxChange = document.getElementById("add-tax");
    taxChange.addEventListener("change", handlePriceOrAmountChange);

    let addNewItem = document.getElementById("add-item");
    addNewItem.addEventListener("click", handleAddNewItemClick);

    var logos = document.getElementsByClassName("logo-to-get");
    addLogoClickListener(logos);
    document.getElementById("upload-logo").addEventListener("click", showGallery);

    let now = new Date();
    let dateDay = now.getDate();
    let dateMonth = now.getMonth()+1;
    let dateYear = now.getFullYear();
    let invoiceDate = dateDay + "-" + dateMonth + "-" + dateYear;
    document.getElementById("invoice-date").value = invoiceDate;
}

function addLogoClickListener(logos) {
    for (var i = 0; i < logos.length; i++) {
        var logo = logos[i];
        logo.addEventListener("click", getSrc);
    }
}

function getSrc() {
    document.getElementById("logo-gallery").style.display = "none";
    document.getElementById("cover").style.display = "none";
    // this will show logo to user and replace Upload button
    // logoSrc = this.getAttribute("src");
    // uploadButton = document.getElementById("upload-logo");
    // uploadButton = document.createElement("img");
    // uploadButton.src = logoSrc;
    //
    let logodiv = document.getElementById("logo-div");
    let img = document.createElement("img");
    img.setAttribute("class", "logo-to-get");
    img.setAttribute("src", this.getAttribute("src"));
    logodiv.appendChild(img);
    return this.getAttribute("src");
}

function showGallery() {
    document.getElementById("logo-gallery").style.display = "flex";
    document.getElementById("cover").style.display = "block";
}

let handleSaveClick = function () {
    // create localStorage file is it doesn't exist
    if (JSON.parse(localStorage.getItem("invoices")) === null ) {
        let invoices = new Array();
        localStorage.setItem("invoices", JSON.stringify(invoices));
        window.location.replace("myInvoices.html");
    }
    
    // read existing localStorage file
    let invoices = JSON.parse(localStorage.getItem("invoices"));
    
    // prepare data for new invoice
    let from = document.getElementById("from").value;
    let billTo = document.getElementById("to").value;
    let invoiceDate = document.getElementById("invoice-date").value;
    let termsAndConditions = document.getElementById("t&c").value;
    
    let items = new Array();
    for(let i=1; i<addNewItemCount+1; i++) {
        let description;
        let amount;
        let price;
        let tax;
        if (i === 1) {
            description = document.getElementById("description").value;
            amount = document.getElementById("amount").value;
            price = document.getElementById("price").value;
            tax = document.getElementById("add-tax").value.split("%")[0];
        }
        if (i > 1) {
            description = document.getElementById("description"+addNewItemCount).value;
            amount = document.getElementById("amount"+addNewItemCount).value;
            price = document.getElementById("price"+addNewItemCount).value;
            tax = document.getElementById("add-tax"+addNewItemCount).value.split("%")[0];
        }
        let item = {
            description,
            amount,
            price,
            tax,
        }
        items.push(item);
    }
        let invoice = {
            from,
            billTo,
            logoSrc,
            invoiceDate,
            items,
            termsAndConditions
        }
        invoices.push(invoice);
    
    // save new invoice in localStorage
    localStorage.setItem("invoices", JSON.stringify(invoices));
    window.location.replace("myInvoices.html");
}


let handlePriceOrAmountChange = function() {
    let subtotal;
    let total;
    for (let i=0; i<itemIds.length; i++) {
        if (i === 0) {
            let price = document.getElementById("price").value;
            let amount = document.getElementById("amount").value;
            let tax = document.getElementById("add-tax").value.split("%")[0];
            subtotal_1 = price * amount;
            document.getElementById("subtotal-amount").innerHTML = subtotal_1;
            total_1 = subtotal_1 + subtotal_1 * (tax/100);
            document.getElementById("total-amount").innerHTML = total_1;
            subtotal = subtotal_1;          
            total = total_1;
            }
        if (i > 0) {
            let price = document.getElementById("price"+itemIds[i]).value;
            let amount = document.getElementById("amount"+itemIds[i]).value;
            let tax = document.getElementById("add-tax"+itemIds[i]).value.split("%")[0];
            let tempSubtotal = price * amount;
            let tempTotal = tempSubtotal + tempSubtotal * (tax/100);
            subtotal += tempSubtotal;
            total += tempTotal;
        }
    }
    document.getElementById("subtotal-amount").innerHTML = subtotal;
    document.getElementById("total-amount").innerHTML = total;
}

let handleAddNewItemClick = function() {
    addNewItemCount++;
    currentHighestItemIndex++;
    let items = document.getElementById("items");

    let newItem = document.createElement("div");
    newItem.setAttribute("class", "item");
    newItem.setAttribute("id", "item-area");

    itemIds.push(currentHighestItemIndex);

    let formGroup1 = document.createElement("div");
    formGroup1.setAttribute("class", "form-group");
    let label1 = document.createElement("label");
    label1.setAttribute("for", "description");
    label1.innerText = "Description";
    let textarea1 = document.createElement("textarea");
    textarea1.setAttribute("id", "description"+currentHighestItemIndex);
    textarea1.setAttribute("rows", "8");
    textarea1.setAttribute("cols", "50");
    formGroup1.appendChild(label1);
    formGroup1.appendChild(textarea1);
    newItem.appendChild(formGroup1);

    let formGroup2 = document.createElement("div");
    formGroup2.setAttribute("class", "form-group");
    let label2 = document.createElement("label");
    label2.setAttribute("for", "amount");
    label2.innerText = "Amount";
    let input2 = document.createElement("input");
    input2.setAttribute("id", "amount"+currentHighestItemIndex);
    input2.addEventListener("change", handlePriceOrAmountChange);
    formGroup2.appendChild(label2);
    formGroup2.appendChild(input2);
    newItem.appendChild(formGroup2);

    let formGroup3 = document.createElement("div");
    formGroup3.setAttribute("class", "form-group");
    let label3 = document.createElement("label");
    label3.setAttribute("for", "price");
    label3.innerText = "Price";
    let input3 = document.createElement("input");
    input3.setAttribute("id", "price"+currentHighestItemIndex);
    input3.addEventListener("change", handlePriceOrAmountChange);
    formGroup3.appendChild(label3);
    formGroup3.appendChild(input3);
    newItem.appendChild(formGroup3);

    let formGroup4 = document.createElement("div");
    formGroup4.setAttribute("class", "form-group");
    let label4 = document.createElement("label");
    label4.setAttribute("for", "add-tax");
    label4.innerText = "Tax";
    let input4 = document.createElement("input");
    input4.setAttribute("id", "add-tax"+currentHighestItemIndex);
    input4.setAttribute("value", "23%");
    input4.addEventListener("change", handlePriceOrAmountChange);
    formGroup4.appendChild(label4);
    formGroup4.appendChild(input4);
    newItem.appendChild(formGroup4);

    let formGroup5 = document.createElement("div");
    formGroup5.setAttribute("class", "form-group");
    let label5 = document.createElement("label");
    label5.setAttribute("class", "invisible");
    label5.innerText = " ";
    let button5 = document.createElement("button");
    button5.setAttribute("class", "button");
    button5.setAttribute("id", "delete-item"+currentHighestItemIndex);
    button5.setAttribute("type", "button");
    button5.innerText = "Delete Item";
    let index = currentHighestItemIndex;
    button5.addEventListener("click", function() { 
        let elementToDelete = document.getElementById("item-area"+index);
        elementToDelete.parentNode.removeChild(elementToDelete);
        addNewItemCount--;
        itemIds.splice(itemIds.indexOf(index),1);
    });
    button5.addEventListener("click", handlePriceOrAmountChange);
    formGroup5.appendChild(label5);
    formGroup5.appendChild(button5);
    newItem.appendChild(formGroup5);

    items.appendChild(newItem);
}


// <!-- DO GENEROWANIA PDF: -->
// <!-- var doc = new jsPDF();
// doc.text('Hello world!', 10, 10);
// doc.save('a4.pdf');
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.debug.js"></script> -->