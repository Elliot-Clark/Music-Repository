let updatePersonForm = document.getElementById('update-album-form-ajax');

// Modify the objects we need
updatePersonForm.addEventListener("submit", function (e) {

    console.log("Running update")
   
    // Prevent the form from submitting
    e.preventDefault();

    let albumID = document.getElementById("update-ID").value;
    let albumArtist = document.getElementById("update-artist").value;
    let albumTitle = document.getElementById("update-title").value;
    let albumGenre = document.getElementById("update-genre").value;
    let albumDate = document.getElementById("update-release_date").value;
    let albumPrice = document.getElementById("update-price").value;

    if (!albumArtist && !albumTitle && !albumGenre && !albumDate && !albumPrice) {
        return
    }

    let data = {
        albumID: albumID,
        albumArtist: albumArtist,
        albumTitle: albumTitle,
        albumGenre: albumGenre,
        albumDate: albumDate,
        albumPrice: albumPrice
    }

    console.log(data)
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-album-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    console.log("Feafeff")

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        console.log(xhttp.readyState, xhttp.status)
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            console.log("Running xhttp thing")
            updateRow(xhttp.response, albumID, albumAmount);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));

})

function updateRow(data, albumID, albumAmount){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("album-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == albumID) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let td = updateRowIndex.getElementsByTagName("td")[2];
            td.innerHTML = "$" + albumAmount; 
       }
    }
}
