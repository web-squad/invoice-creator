window.onload = function () { 
    let addClient = document.getElementById("save");
    addClient.addEventListener("click", handleSaveClick);
}

let handleSaveClick = function () {
    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let acc_number = document.getElementById("acc_number").value;
    let adress = document.getElementById("adress").value;
    let company = document.getElementById("company").value;

    // create localStorage file is it doesn't exist
    if (JSON.parse(localStorage.getItem("clients")) === null ) {
        let clients = new Array();
        localStorage.setItem("clients", JSON.stringify(clients));
    }

    let clients = JSON.parse(localStorage.getItem("clients"));

    let client = {
        name,
        surname,
        acc_number,
        adress,
        company
    }

    clients.push(client);
    localStorage.setItem("clients", JSON.stringify(clients));
}

