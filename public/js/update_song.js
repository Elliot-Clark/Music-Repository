// Citation for the following starter code:
// Based off of "osu-cs340-ecampus/nodejs-starter-app":

let updatePersonForm = document.getElementById('update-song-form-ajax');

// Modify the objects we need
updatePersonForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    let songID = document.getElementById("update-ID").value;
    let songDuration = document.getElementById("update-duration").value;
    let songAlbum = document.getElementById("update-album").value;

    if (!songDuration && !songAlbum) {
        return
    }

    let data = {
        songID: songID,
        songDuration: songDuration,
        songAlbum: songAlbum
    }

    console.log(data)
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-song-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            updateRow(xhttp.response, songID, songDuration, songAlbum);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));

})

function updateRow(data, songID, songDuration, songAlbum){
    let parsedData = JSON.parse(data);
    let table = document.getElementById("song-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == songID) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            if (songDuration) {
                updateRowIndex.getElementsByTagName("td")[2].innerHTML = songDuration
            }

            updateRowIndex.getElementsByTagName("td")[3].innerHTML = songAlbum

       }
    }
}