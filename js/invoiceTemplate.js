window.onload = function () {
    // document.getElementById("print").addEventListener("click",printPage);
    
    // generate HTML invoice

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    today = mm + '/' + dd + '/' + yyyy;

    let invoiceNum = location.hash.split("#")[1];
    let invoPrintNum = Number(invoiceNum)+1;

    let invoices = JSON.parse(localStorage.getItem("invoices"));
    
    let invoiceDate = invoices[invoiceNum].invoiceDate;
    document.getElementById("invoice-number").innerHTML = "Invoice #: " + invoPrintNum + "<br>Created: " + invoiceDate + "<br>Due: 14 days";
    
    // debugger   

    let customerName = invoices[invoiceNum].billTo;
    document.getElementById("customer").innerHTML = customerName;

    let dealerName = invoices[invoiceNum].from;
    document.getElementById("dealer").innerHTML = dealerName;

    // for (let i=0;i<invoices.length; i++){
    //     let name = invoices[i].billTo;
    // } 

    let descItem = invoices[invoiceNum].items[0].description;
    document.getElementById("descItem").innerHTML = descItem;

    let itemAmount = invoices[invoiceNum].items[0].amount;
    document.getElementById("itemAmount").innerHTML = itemAmount;

    let itemPrice = invoices[invoiceNum].items[0].price;
    document.getElementById("itemPrice").innerHTML = itemPrice;

    let itemTax = invoices[invoiceNum].items[0].tax;
    document.getElementById("itemTax").innerHTML = itemTax;

    let totalPrice = invoices[invoiceNum].items[0].price;
    document.getElementById("totalPrice").innerHTML = "<strong>Total: $"+totalPrice+"<strong>";

    let conditions = invoices[invoiceNum].termsAndConditions;
    document.getElementById("conditions").innerHTML = "<strong>Additional terms and conditions:</strong><br>"+conditions;

    let newLogoSrc = invoices[invoiceNum].items[0].logoSrc;
    document.getElementById("logo").innerHTML = <img src="newLogoSrc"></img>;
    
    printPage();
}

function printPage (){
    window.print();  
}