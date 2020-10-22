var express = require("express");
var path = require("path");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
// Middleware - what to do when it's in between/traveling between client and server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Basic route that sends the user first to the AJAX Page
app.get("/home", function (req, res) {
    // res.sendFile(path.join(__dirname, ".../index.html"));
    // res.sendFile('index.html', { root: '..' })
    // res.sendFile(path.resolve(__dirname, 'index.html', '.../'))
//     /* final catch-all route to index.html defined last */
// app.get('/*', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
//   })
res.sendFile(path.join(__dirname, "../../index.html"));

  
});
app.get("/notes.html", function (req, res) {
    res.sendFile(path.join(__dirname, "../../notes.html"));
});
app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});
// Displays all tables in the array
app.get("/array", function(req, res) {
    return res.json(tableArray);
});

// TODO: rename this note
let tableArray = [
    { // table info (guest name, number, etc)
        // when server in use with Postman and this text is entered,
        // the results in Terminal have both below and Postman entry
      name: "Yoda",
      email: "test@test.com",
      phone: "123-415-1478",
      id: "123"
    }
];

// Create new tables - takes in JSON input
app.post("/reserve", function(req, res) { // used with Postman for a collection (http://localhost:3000/reserve)
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    // JS object below (in string mode)
    let tableName = req.body;
    console.log(tableName);
    // We then add the json the user sent to the character array
    tableArray.push(tableName);
    console.log(tableArray);
    // We then display the JSON to the users
    res.json(tableName);
});
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});