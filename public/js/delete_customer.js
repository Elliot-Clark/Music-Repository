// Citation for the following starter code:
// Based off of "osu-cs340-ecampus/nodejs-starter-app":

function deleteCustomer(customerID) {
    let data = {
        customerID: customerID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-customer-ajax/", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(customerID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
}

function deleteRow(customerID){
    let table = document.getElementById("customer-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == customerID) {
            table.deleteRow(i);
            deleteDropDownMenu(customerID);
            break;
       }
    }
}