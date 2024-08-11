// Citation for the following starter code:
// Based off of "osu-cs340-ecampus/nodejs-starter-app":

function deletePurchase(purchaseID) {
    let data = {
        purchaseID: purchaseID
    };
    console.log(data)

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-purchase-ajax/", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(purchaseID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
}

function deleteRow(purchaseID){
    let table = document.getElementById("purchase-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == purchaseID) {
            table.deleteRow(i);
            deleteDropDownMenu(purchaseID);
            break;
       }
    }
}