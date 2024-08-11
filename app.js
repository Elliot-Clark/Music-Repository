// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app = express();               // We need to instantiate an express object to interact with the server in our code
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
PORT = 2011;                       // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/

// --------------------------------------------------------PURCHASE---------------------------------------------
app.get('/purchase', function(req, res) {
    let query1;

    if (req.query.purchaseAmount === undefined) {
        query1 = "SELECT * FROM `Purchases`";
    } else {
        query1 = `SELECT * FROM Purchases WHERE purchaseAmount LIKE "${req.query.purchaseAmount}%"`;
    }

    db.pool.query(query1, function(error, rows, fields) {
        let results = rows;
        return res.render('purchase', { data: results });
    });
});

app.post('/add-purchase-form', function(req, res) {
    let data = req.body;
    console.log(req.body);

    let query1 = `
        INSERT INTO Purchases (purchaseDate, purchaseAmount, customerID, albumID)
        SELECT 
            '${data['date']}' as purchaseDate,
            ${data['amount']} as purchaseAmount,         
            c.customerID,                 
            a.albumID                 
        FROM Customers c
        JOIN Albums a ON a.albumTitle = '${data['album']}'
        WHERE c.email = '${data['customer']}';
    `;

    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('/purchase');
        }
    });
});

app.delete('/delete-purchase-ajax/', function(req, res, next) {
    let data = req.body;
    let purchase_ID = parseInt(data.purchaseID);
    let delete_Purchase = `
        DELETE FROM Purchases 
        WHERE purchaseID = ?
    `;

    db.pool.query(delete_Purchase, [purchase_ID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

app.put('/update-purchase-ajax', function(req, res, next) {
    let data = req.body;
    let purchaseID = data.purchaseID;
    let purchaseAmount = data.purchaseAmount;

    let queryUpdatePurchase = `
        UPDATE Purchases
        SET purchaseAmount = ?
        WHERE purchaseID = ?
    `;

    let selectPurchase = `SELECT * FROM Purchases WHERE purchaseID = ?`;

    db.pool.query(queryUpdatePurchase, [purchaseAmount, purchaseID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(selectPurchase, [purchaseID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });
});

// --------------------------------------------------------ARTIST----------------------------------------------
app.post('/add-artist-form', function(req, res) {
    console.log('Add request received'); // Debug log
    let data = req.body;

    let query1 = `INSERT INTO Artists (artistName, country, website) VALUES ('${data['input-artistName']}', '${data['input-country']}', '${data['input-website']}')`;
    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.error("Database insert error: ", error);
            res.sendStatus(400); // Bad Request
        } else {
            res.redirect('/artist'); // Redirect back to the root route
        }
    });
});

app.get('/artist', function(req, res) {
    let query1;

    if (req.query.lname === undefined) {
        query1 = "SELECT * FROM Artists;";
    } else {
        query1 = `SELECT * FROM Artists WHERE artistName LIKE "${req.query.lname}%"`;
    }

    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.error("Database query error: ", error);
            res.sendStatus(500); // Internal Server Error
            return;
        }
        return res.render('artist', { data: rows });
    });
});

// --------------------------------------------------------ALBUM----------------------------------------------
app.get('/album', function(req, res) {
    let query1;

    if (req.query.title === undefined) {
        query1 = "SELECT * FROM Albums;";
    } else {
        query1 = `SELECT * FROM Albums WHERE albumTitle LIKE "${req.query.title}%"`;
    }

    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.error("Database query error: ", error);
            res.sendStatus(500); // Internal Server Error
            return;
        }
        return res.render('album', { data: rows });
    });
});

app.post('/add-album-form', function(req, res) {
    let data = req.body;

    let query1 = `INSERT INTO Albums (albumTitle, albumGenre, albumReleaseDate, albumPrice, artistID) VALUES ('${data['title']}', '${data['genre']}', '${data['release_date']}', ${data['price']}, ${data['artist']})`;

    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.error("Database insert error: ", error);
            res.sendStatus(400); // Bad Request
        } else {
            res.redirect('/album'); // Redirect back to the album route
        }
    });
});

// --------------------------------------------------------CUSTOMER-------------------------------------------
app.get('/customer', function(req, res) {
    let query1;

    if (req.query.email === undefined) {
        query1 = "SELECT * FROM Customers;";
    } else {
        query1 = `SELECT * FROM Customers WHERE email LIKE "${req.query.email}%"`;
    }

    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.error("Database query error: ", error);
            res.sendStatus(500); // Internal Server Error
            return;
        }
        return res.render('customer', { data: rows });
    });
});

app.post('/add-customer-form', function(req, res) {
    console.log('Add request received'); // Debug log
    let data = req.body;

    let query1 = `
        INSERT INTO Customers (email, phoneNumber) 
        VALUES ('${data['email']}', '${data['phone']}')
    `;
    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.error("Database insert error: ", error);
            res.sendStatus(400); // Bad Request
        } else {
            res.redirect('/customer'); // Redirect back to the customer page
        }
    });
});

// --------------------------------------------------------SONG-----------------------------------------------
app.get('/song', function(req, res) {
    let query1;

    if (req.query.title === undefined) {
        query1 = "SELECT * FROM Songs;";
    } else {
        query1 = `SELECT * FROM Songs WHERE songTitle LIKE "${req.query.title}%"`;
    }

    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.error("Database query error: ", error);
            res.sendStatus(500); // Internal Server Error
            return;
        }
        return res.render('song', { data: rows });
    });
});

app.post('/add-song-form', function(req, res) {
    let data = req.body;

    let query1 = `INSERT INTO Songs (songTitle, songDuration, albumID) VALUES ('${data['title']}', '${data['duration']}', ${data['album']})`;

    db.pool.query(query1, function(error, rows, fields) {
        if (error) {
            console.error("Database insert error: ", error);
            res.sendStatus(400); // Bad Request
        } else {
            res.redirect('/song'); // Redirect back to the song route
        }
    });
});

/*
    LISTENER
*/
app.listen(PORT, function() {            
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
