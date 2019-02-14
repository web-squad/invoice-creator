let content = document.getElementById("clientsTable");

let clients = JSON.parse(localStorage.getItem("clients"));
for (let i = 0; i < clients.length; i++){
    let client_name = clients[i].name;
    let client_surname = clients[i].surname;
    let client_acc_nr = clients[i].acc_number;
    let client_adress = clients[i].adress;
    let client_company = clients[i].company;

    let tr = document.createElement("tr");
    content.appendChild(tr);
    let id = document.createElement("td");
    id.innerHTML = i;
    content.appendChild(id);
    let name = document.createElement("td");
    name.innerHTML = client_name;
    content.appendChild(name);
    let surname = document.createElement("td");
    surname.innerHTML = client_surname;
    content.appendChild(surname);
    let acc_number = document.createElement("td");
    acc_number.innerHTML = client_acc_nr;
    content.appendChild(acc_number);
    let adress = document.createElement("td");
    adress.innerHTML = client_adress;
    content.appendChild(adress);
    let company = document.createElement("td");
    company.innerHTML = client_company;
    content.appendChild(company);  

    var newEditButton = document.createElement("button");
    newEditButton.setAttribute('buttonid', i);
    newEditButton.setAttribute("class", "glyphicon glyphicon-pencil");
    content.appendChild(newEditButton);
    newEditButton.onclick = function() { editClient( this.getAttribute("buttonid") )};
    
    var newDeleteButton = document.createElement("button");
    newDeleteButton.setAttribute('buttonid', i);
    newDeleteButton.setAttribute("class", "glyphicon glyphicon-trash");
    content.appendChild(newDeleteButton);
    newDeleteButton.onclick = function() { deleteClient( this.getAttribute("buttonid") )};

    function deleteClient(index) {
        alert("deleting nr:"+index);
        var storedNames = JSON.parse(localStorage.getItem("name"));
        storedTitles.splice(index, 1);
        localStorage.setItem("titles", JSON.stringify(storedTitles));
       
        var storedNotes = JSON.parse(localStorage.getItem("noteContents"));
        storedNotes.splice(index, 1);
        localStorage.setItem("noteContents", JSON.stringify(storedNotes));
        alert("usunieto");
    }
}


