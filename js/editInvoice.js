window.onload = function () { 
    let saveButton = document.getElementById("save");
    saveButton.addEventListener("click", handleSaveClick);

    let priceChange = document.getElementById("price");
    priceChange.addEventListener("change", handlePriceOrAmountChange);

    let amountChange = document.getElementById("amount");
    amountChange.addEventListener("change", handlePriceOrAmountChange);

    // let addNewItem = document.getElementById("add-item");
    // addNewItem.addEventListener("click", handleAddNewItemClick);

    var logos = document.getElementsByClassName("logo-to-get");
    addLogoClickListener(logos);
    document.getElementById("upload-logo").addEventListener("click", showGallery);

    let index = location.hash.split("#")[1];
    let invoice = JSON.parse(localStorage.getItem("invoices"))[index];
    document.getElementById("from").innerText = invoice.from;
    // --------------------------------------------------- tutaj zrobic aby dodawalo sie z enterami do formularza
    document.getElementById("to").innerText = invoice.billTo;
    document.getElementById("description").innerText = invoice.items[0].description;
    document.getElementById("price").value = invoice.items[0].price;
    document.getElementById("amount").value = invoice.items[0].amount;
    document.getElementById("add-tax").value = invoice.items[0].tax + "%";
    document.getElementById("t&c").value = invoice.termsAndConditions;
    document.getElementById("invoice-date").value = invoice.invoiceDate;
    calculateTotal();
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
    // read data from html
    let from = document.getElementById("from").value;
    let billTo = document.getElementById("to").value;
    let invoiceDate = document.getElementById("invoice-date").value;
    //let logo =  document.getElementById("upload-logo").value;
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
    let termsAndConditions = document.getElementById("t&c").value;
    items.push(item);

    let invoice = {
        from,
        billTo,
        //logo,
        invoiceDate,
        items,
        termsAndConditions
    }
        
    // read existing localStorage file
    let invoices = JSON.parse(localStorage.getItem("invoices"));
    
    // save edited invoice in localStorage
    let index = location.hash.split("#")[1];
    invoices[index] = invoice;
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

// let handleAddNewItemClick = function() {
//     let items = document.getElementById("items");

//     let newItem = document.createElement("div");
//     newItem.setAttribute("class", "item");
//     newItem.setAttribute("id", "item-area");
//     items.appendChild(newItem);

//     // generate Description Text field
//     let nDescriptionNode = document.createElement("div");
//     nDescriptionNode.setAttribute("class", "form-group");
//     let nDescriptionLabel = document.createElement("label");
//     nDescriptionLabel.setAttribute("for", "description");
//     nDescriptionLabel.innerHTML = "Description";
//     nDescriptionNode.append(nDescriptionLabel);
//     let nDescriptionInput = document.createElement("textarea");
//     nDescriptionInput.setAttribute("rows", "8");
//     nDescriptionInput.setAttribute("cols", "50");
//     nDescriptionInput.setAttribute("id", "description");
//     nDescriptionNode.append(nDescriptionInput);
//     items.appendChild(nDescriptionNode);
//     document.getElementById("items").appendChild(nDescriptionNode);
    
//     // generate Amount Text field
//     let nAmount = document.createElement("div");
//     nAmount.setAttribute("class", "form-group");
//     let nAmountLabel = document.createElement("label");
//     nAmountLabel.setAttribute("for", "amount");
//     nAmountLabel.innerHTML = "Amount";
//     nAmount.append(nAmountLabel);
//     let nAmountInput = document.createElement("input");
//     nAmountInput.setAttribute("id", "amount");
//     nAmount.append(nAmountInput);
//     items.appendChild(nAmount);
//     document.getElementById("items").appendChild(nAmount);

//     // generate Price Text field
//     let nPrice = document.createElement("div");
//     nPrice.setAttribute("class", "form-group");
//     let nPriceLabel = document.createElement("label");
//     nPriceLabel.setAttribute("for", "price");
//     nPriceLabel.innerHTML = "Price";
//     nPrice.append(nPriceLabel);
//     let nPriceInput = document.createElement("input");
//     nPriceInput.setAttribute("id", "price");
//     nPrice.append(nPriceInput);
//     items.appendChild(nPrice);
//     document.getElementById("items").appendChild(nPrice);
   

//     // generate Tax Text field
//     let nTax = document.createElement("div");
//     nTax.setAttribute("class", "form-group");
//     let nTaxLabel = document.createElement("label");
//     nTaxLabel.setAttribute("for", "add-tax");
//     nTaxLabel.innerHTML = "Tax";
//     nTax.append(nTaxLabel);
//     let nTaxInput = document.createElement("input");
//     nTaxInput.setAttribute("id", "add-tax");
//     nTaxInput.setAttribute("value", "23%");
//     nTax.append(nTaxInput);
//     items.appendChild(nTax);
//     document.getElementById("items").appendChild(nTax);

//     //generate Delete button
//     let nButton = document.createElement("div");
//     nButton.setAttribute("class", "form-group");
//     let nDeleteButtonLabel = document.createElement("label");
//     nDeleteButtonLabel.setAttribute("class", "invisible");
//     nDeleteButtonLabel.innerHTML = " ";
//     nButton.append(nDeleteButtonLabel);
//     let nDeleteButton = document.createElement("button");
//     nDeleteButton.setAttribute("class", "button");
//     nDeleteButton.setAttribute("id", "delete-item");
//     nDeleteButton.setAttribute("type", "button");
//     nDeleteButton.innerHTML = "Delete Item";
//     nButton.append(nDeleteButton);
//     items.appendChild(nButton);
//     document.getElementById("items").appendChild(nButton);
// }

// <!-- DO GENEROWANIA PDF: -->
// <!-- var doc = new jsPDF();
// doc.text('Hello world!', 10, 10);
// doc.save('a4.pdf');
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.debug.js"></script> -->