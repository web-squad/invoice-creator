window.onload = function () {
    loadClients();
}
let invoices = JSON.parse(localStorage.getItem("invoices"));
let clients = []
for(let i = 0; i < invoices.length; i++) {
    clients.push(invoices[i].billTo);
}

let clientsUnique = removeDuplicates(clients);

function removeDuplicates(arr){
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array
}

function loadClients() {
    let count = 1;
    
    let table = document.getElementById("table");
    for (let i = 0; i < clientsUnique.length; i++) {
        let client = clientsUnique[i];

        let row = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.innerHTML = count++;

        let td2 = document.createElement("td");
        td2.innerHTML = client;

        let td3 = document.createElement("td");

        let button = document.createElement("button");
        button.addEventListener("click", goToNewInvoice);
        button.setAttribute("class", "button");
        button.setAttribute("type", "button");
        button.innerHTML = "Create Invoice";
        td3.appendChild(button);
        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        table.appendChild(row);
    }
}

function goToNewInvoice() {
    window.location.href = "newInvoice.html";
}



