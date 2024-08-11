let updatePersonForm = document.getElementById('update-purchase-form-ajax');

// Modify the objects we need
updatePersonForm.addEventListener("submit", function (e) {

    console.log("Running update")
   
    // Prevent the form from submitting
    e.preventDefault();

    let purchaseID = document.getElementById("update-ID").value;
    let purchaseDate = document.getElementById("update-date").value;
    let purchaseAmount = document.getElementById("update-amount").value;
    let purchaseCustomer = document.getElementById("update-customer").value;
    let purchaseAlbum = document.getElementById("update-album").value;

    if (!purchaseAlbum && !purchaseAmount && !purchaseCustomer && !purchaseDate) {
        return
    }

    let data = {
        purchaseID: purchaseID,
        purchaseDate: purchaseDate,
        purchaseAmount: purchaseAmount,
        purchaseCustomer: purchaseCustomer,
        purchaseAlbum: purchaseAlbum
    }

    console.log(data)
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-purchase-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    console.log("Feafeff")

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        console.log(xhttp.readyState, xhttp.status)
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            console.log("Running xhttp thing")
            updateRow(xhttp.response, purchaseID, purchaseAmount);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));

})

function updateRow(data, purchaseID, purchaseAmount){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("purchase-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == purchaseID) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let td = updateRowIndex.getElementsByTagName("td")[2];
            td.innerHTML = "$" + purchaseAmount; 
       }
    }
}
