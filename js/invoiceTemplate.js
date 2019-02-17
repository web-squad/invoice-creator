function getFromLocalStorage (arrInfo, invoiceNum , elemKey){
    return arrInfo[invoiceNum].elemKey;
}

function getItemFromLocalStorage () {
    return ;
}

function modifyHTML () {
    return ;
}

function createItems (invoices, invoiceNum) {
    
    // let items = invoices[invoiceNum].items;
    
    let table = document.getElementById("table");

    for (let i=0; invoices[invoiceNum].items.length;++i) {

        let row = document.createElement("tr");
        table.appendChild(row);
        row.setAttribute("class","item");

        let descItem = document.createElement("td");
        descItem.setAttribute("id","descItem");
        row.appendChild(descItem);
        descItem.innerHTML = invoices[invoiceNum].items[i].description;

        let itemAmount = document.createElement("td");
        itemAmount.setAttribute("id","itemAmount");
        row.appendChild(itemAmount);
        itemAmount.innerHTML = invoices[invoiceNum].items[i].amount;

        let itemPrice = document.createElement("td");
        itemPrice.setAttribute("id","itemPrice");
        row.appendChild(itemPrice);
        itemPrice.innerHTML = invoices[invoiceNum].items[i].price;

        let itemTax = document.createElement("td");
        itemTax.setAttribute("id","itemTax");
        row.appendChild(itemTax);
        itemTax.innerHTML = invoices[invoiceNum].items[i].tax;

    }
}

window.onload = function () {

    let invoiceNum = location.hash.split("#")[1]
    let invoPrintNum = Number(invoiceNum)+1;

    let invoices = JSON.parse(localStorage.getItem("invoices"));
    
    let invoiceDate = invoices[invoiceNum].invoiceDate;
    document.getElementById("invoice-number").innerHTML = "Invoice #: " + invoPrintNum + "<br>Created: " + invoiceDate + "<br>Due: 14 days";
    
    let customerName = invoices[invoiceNum].billTo;
    // let customerName = getFromLocalStorage(invoices, invoiceNum, billTo);
    document.getElementById("customer").innerHTML = customerName;

    // let dealerName = invoices[invoiceNum].from;
    // document.getElementById("dealer").innerHTML = dealerName;

    // let descItem = invoices[invoiceNum].items[0].description;
    // document.getElementById("descItem").innerHTML = descItem;

    // let itemAmount = invoices[invoiceNum].items[0].amount;
    // document.getElementById("itemAmount").innerHTML = itemAmount;

    // let itemPrice = invoices[invoiceNum].items[0].price;
    // document.getElementById("itemPrice").innerHTML = itemPrice;

    // let itemTax = invoices[invoiceNum].items[0].tax;
    // document.getElementById("itemTax").innerHTML = itemTax;
    createItems(invoices,invoiceNum);

    let totalPrice = invoices[invoiceNum].items[0].price;
    document.getElementById("totalPrice").innerHTML = "<strong>Total: $"+totalPrice+"<strong>";

    let conditions = invoices[invoiceNum].termsAndConditions;
    if (conditions != ""){
        document.getElementById("conditions").innerHTML = "<strong>Additional terms and conditions:</strong><br>"+conditions;
    }


    let newLogoSrc = invoices[invoiceNum].logoSrc;
    if (newLogoSrc === undefined){
        newLogoSrc = "img/logo1.png";
        document.getElementById("logo").setAttribute('src',newLogoSrc);
    } else {
        document.getElementById("logo").setAttribute('src',newLogoSrc);
    };
    
    // printPage();
}

function printPage (){
    window.print();  
}

// Function below are not used!
function calendar () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0
    var yyyy = today.getFullYear();

    if(dd<10) {
        addZero(dd);
    } 

    if(mm<10) {
        addZero(mm);
    } 

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

function addZero (num) {
    let numWithZero = '0' + num;
    return numWithZero;
}