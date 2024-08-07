// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 2010;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector')

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/
app.get('/purchase', function(req, res)
{
    let query1;

    if (req.query.purchaseAmount === undefined) {
        query1 = "SELECT * FROM `Purchases`";
    }
    else {
        query1 = `SELECT * FROM Purchases WHERE purchaseAmount LIKE "${req.query.purchaseAmount}%"`
    }
    db.pool.query(query1, function(error, rows, fields){
        
        let results = rows;
        
        return res.render('purchase', {data: results});

    })
});

app.post('/add-purchase-form', function(req, res){
    let data = req.body;
    console.log(req.body)

    query1 = `
    INSERT INTO Purchases (purchaseDate, purchaseAmount, customerID, albumID)
    SELECT 
        '${data['date']}' as purchaseDate,
        ${data['amount']} as purchaseAmount,         
        c.customerID,                 
        a.albumID                 
    FROM Customers c
    JOIN Albums a ON a.albumTitle = '${data['album']}'
    WHERE c.email = '${data['customer']}';
    `

     db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else {
            res.redirect('/purchase');
        }
    })
})

app.delete('/delete-purchase-ajax/', function(req, res, next){
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
  })
});

app.put('/update-purchase-ajax', function(req,res,next){
    let data = req.body;

    let purchaseID = data.purchaseID;
    let purchaseAmount = data.purchaseAmount;

    let queryUpdatePurchase = `
    UPDATE Purchases
    SET purchaseAmount = ?
    WHERE purchaseID = ?
     `;

    let selectPurchase = `SELECT * FROM Purchases WHERE purchaseID = ?`

    db.pool.query(queryUpdatePurchase, [purchaseAmount, purchaseID], function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            db.pool.query(selectPurchase, [purchaseID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

app.get('/', function(req, res)
{
    return res.render('home');
});

app.get('/album', function(req, res)
{
    return res.render('album');
});

app.get('/artist', function(req, res)
{
    return res.render('artist');
});

app.get('/customer', function(req, res)
{
    return res.render('customer');
});

app.get('/song', function(req, res)
{
    return res.render('song');
});


/*
    LISTENER
*/
app.listen(PORT, function(){            
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});


