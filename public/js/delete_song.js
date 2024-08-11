// Citation for the following starter code:
// Based off of "osu-cs340-ecampus/nodejs-starter-app":

function deleteSong(songID) {
    let data = {
        songID: songID
    };
    

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-song-ajax/", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(songID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
}

function deleteRow(songID){
    let table = document.getElementById("song-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == songID) {
            table.deleteRow(i);
            deleteDropDownMenu(songID);
            break;
       }
    }
}