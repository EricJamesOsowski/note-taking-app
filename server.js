const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json")

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
// Middleware - what to do when it's in between/traveling between client and server

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Handle HTML routing
app.get("/notes.html", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

//  Handle API routing
app.get("/api/notes", function(req, res) {
    res.json(db)
});

app.post("/api/notes", function(req, res) {
    db.push(req.body);
    assignKeyValueTo(db);
    fs.writeFileSync("./db/db.json", JSON.stringify(db));
    res.json(req.body);
});

// Takes the key value of the note clicked on and sends a delete query, iterating over the db items until it finds the db item that has the value sent and deletes it.
app.delete("/api/notes/:id", function(req, res) {
    let deleteId = parseInt(req.params.id);
    for (var i = 0; i < db.length; i++) {
        if (deleteId === db[i].id) {
            db.splice(i, 1);
            fs.writeFileSync("./db/db.json", JSON.stringify(db));
            return res.status(200).end();
        }
    }
});

// Assigns key value to an existing array
function assignKeyValueTo(objArray){
    for (let i = 0; i < objArray.length; i++) {
        objArray[i]["id"] = i+1;
    }
    return objArray;
}

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});