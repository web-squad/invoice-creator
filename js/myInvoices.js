function handleEditClick(index) {
    window.location.replace("editInvoice.html#"+index);
}

function handleDeleteClick(index) {
    let invoices = JSON.parse(localStorage.getItem("invoices"));
    invoices.splice(index, 1);
    localStorage.setItem("invoices", JSON.stringify(invoices));
    location.reload();
}

let table = document.getElementById("table");
let invoices = JSON.parse(localStorage.getItem("invoices"));
for (let i=0; i < invoices.length; i++) {
    
    let row = document.createElement("tr");
    table.appendChild(row);
    let invoiceId = document.createElement("td");
    row.appendChild(invoiceId);
    invoiceId.innerHTML = i;
    let companyName = document.createElement("td");
    row.appendChild(companyName);
    companyName.innerHTML = invoices[i].from;
    let clientName = document.createElement("td");
    row.appendChild(clientName);
    clientName.innerHTML = invoices[i].billTo;
    
    let buttonTd = document.createElement("td");
    row.appendChild(buttonTd);
    let printButton = document.createElement("button");
    printButton.setAttribute("class", "button");
    printButton.setAttribute("id", "print");
    printButton.setAttribute("type", "button");
    printButton.innerHTML = "Print";
    buttonTd.appendChild(printButton);
    row.appendChild(buttonTd);
    
    let buttonTd2 = document.createElement("td");
    let editButton = document.createElement("button");
    editButton.setAttribute("class", "button");
    editButton.setAttribute("id", "edit"+i);
    editButton.addEventListener("click", function() { handleEditClick(i) });
    editButton.setAttribute("type", "button");
    editButton.innerHTML = "Edit";
    buttonTd2.appendChild(editButton);
    row.appendChild(buttonTd2);
    
    let buttonTd3 = document.createElement("td");
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "button");
    deleteButton.setAttribute("id", "delete"+i);
    deleteButton.addEventListener("click", function() { handleDeleteClick(i) })
    deleteButton.setAttribute("type", "button");
    deleteButton.innerHTML = "Delete";
    buttonTd3.appendChild(deleteButton);
    row.appendChild(buttonTd3);
    
}