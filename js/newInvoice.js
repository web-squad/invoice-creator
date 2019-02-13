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
    }
    
    // read existing localStorage file
    let invoices = JSON.parse(localStorage.getItem("invoices"));
    
    // read data for new invoice
    let from = document.getElementById("from").value;
    let billTo = document.getElementById("to").value;
    //let logo =  document.getElementById("upload-logo").value;
    let invoiceDate = new Date();
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
    
}

// <!-- DO GENEROWANIA PDF: -->
// <!-- var doc = new jsPDF();
// doc.text('Hello world!', 10, 10);
// doc.save('a4.pdf');
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.debug.js"></script> -->