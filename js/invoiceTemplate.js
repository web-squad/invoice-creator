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
    document.getElementById("invoice-number").innerHTML = "Invoice #: " + invoiceNum + "<br>Created: " + today + "<br>Due: 14 days";
    
    let invoices = JSON.parse(localStorage.getItem("invoices"));
    // debugger 
    // for (let i=0;i<invoices.length; i++){
    //     let name = invoices[i].billTo;
    // }    
    let name = invoices[0].billTo;

    document.getElementById("customer").innerHTML = name;
    // printPage();
}

function printPage (){
    window.print();  
}