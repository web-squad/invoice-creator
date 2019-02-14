window.onload = function () { 
    let saveButton = document.getElementById("save");
    saveButton.addEventListener("click", handleSaveClick);

    let priceChange = document.getElementById("price");
    priceChange.addEventListener("change", handlePriceOrAmountChange);

    let amountChange = document.getElementById("amount");
    amountChange.addEventListener("change", handlePriceOrAmountChange);

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
    return this.getAttribute("src");
}

function showGallery() {
    document.getElementById("logo-gallery").style.display = "flex";
    document.getElementById("cover").style.display = "block";
}

function calculateTotal() {
    let price = document.getElementById("price").value;
    let amount = document.getElementById("amount").value;
    let tax = document.getElementById("add-tax").value.split("%")[0];
    let subtotal = price * amount;
    document.getElementById("subtotal-amount").innerHTML = subtotal;
    let total = subtotal + subtotal * (tax/100);
    document.getElementById("total-amount").innerHTML = total;
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
    let description = document.getElementById("description").value;
    let amount = document.getElementById("amount").value;
    let price = document.getElementById("price").value;
    let tax = document.getElementById("add-tax").value.split("%")[0];
    let item = {
        description,
        amount,
        price,
        tax,
    }
    items.push(item);

    let invoice = {
        from,
        billTo,
        //logo,
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
    let price = document.getElementById("price").value;
    let amount = document.getElementById("amount").value;
    let tax = document.getElementById("add-tax").value.split("%")[0];
    let subtotal = price * amount;
    document.getElementById("subtotal-amount").innerHTML = subtotal;
    let total = subtotal + subtotal * (tax/100);
    document.getElementById("total-amount").innerHTML = total;
}

let handleAddNewItemClick = function() {
    let items = document.getElementById("items");

    let newItem = document.createElement("div");
    newItem.setAttribute("class", "item");
    newItem.setAttribute("id", "item-area");

    let formGroup1 = document.createElement("div");
    formGroup1.setAttribute("class", "form-group");
    let label1 = document.createElement("label");
    label1.setAttribute("for", "description");
    label1.innerText = "Description";
    let textarea1 = document.createElement("textarea");
    textarea1.setAttribute("id", "description");
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
    input2.setAttribute("id", "amount");
    formGroup2.appendChild(label2);
    formGroup2.appendChild(input2);
    newItem.appendChild(formGroup2);

    let formGroup3 = document.createElement("div");
    formGroup3.setAttribute("class", "form-group");
    let label3 = document.createElement("label");
    label3.setAttribute("for", "price");
    label3.innerText = "Price";
    let input3 = document.createElement("input");
    input3.setAttribute("id", "price");
    formGroup3.appendChild(label3);
    formGroup3.appendChild(input3);
    newItem.appendChild(formGroup3);

    let formGroup4 = document.createElement("div");
    formGroup4.setAttribute("class", "form-group");
    let label4 = document.createElement("label");
    label4.setAttribute("for", "add-tax");
    label4.innerText = "Tax";
    let input4 = document.createElement("input");
    input4.setAttribute("id", "add-taxe");
    formGroup4.appendChild(label4);
    formGroup4.appendChild(input4);
    newItem.appendChild(formGroup4);

    let formGroup5 = document.createElement("div");
    formGroup5.setAttribute("class", "form-group");
    let label5 = document.createElement("label");
    label5.setAttribute("class", "invisible");
    label5.innerText = " ";
    let botton5 = document.createElement("button");
    botton5.setAttribute("class", "button");
    botton5.setAttribute("id", "delete-item");
    botton5.setAttribute("type", "button");
    botton5.innerText = "Delete Item";
    formGroup5.appendChild(label5);
    formGroup5.appendChild(botton5);
    newItem.appendChild(formGroup5);

    items.appendChild(newItem);
}

// <!-- DO GENEROWANIA PDF: -->
// <!-- var doc = new jsPDF();
// doc.text('Hello world!', 10, 10);
// doc.save('a4.pdf');
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.debug.js"></script> -->