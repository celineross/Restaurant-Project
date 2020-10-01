// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3002;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Restaurant (DATA)
// =============================================================
var tables = [{
  "customerName": "Drew",
  "phoneNumber": "1111111111",
  "customerEmail": "test@test.com",
  "customerID": "1"
  },
  {
  "customerName": "Kalena",
  "phoneNumber": "2222222",
  "customerEmail": "test2@test.com",
  "customerID": "2"
  },
  {
  "customerName": "Lisa",
  "phoneNumber": "3333333333",
  "customerEmail": "test3@test.com",
  "customerID": "3"
  },
  {
  "customerName": "Celine",
  "phoneNumber": "44444444",
  "customerEmail": "test4@test.com",
  "customerID": "4"
  },
  {
  "customerName": "Jeremey",
  "phoneNumber": "5555555555",
  "customerEmail": "test5@test.com",
  "customerID": "5"
  }];

var reserve = [];
// Routes
// =============================================================
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});
app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays all tables
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});
app.get("/api/reserve", function(req, res) {
  return res.json(reserve);
});

// app.get("/api/tables/:table", function(req, res) {
//   var chosen = req.params.tables;
//   console.log(chosen);
//   for (var i = 0; i < tables.length; i++) {
//     if (chosen === tables[i].routeName) {
//       return res.json(tables[i]);
//     }
//   }
//   return res.json(false);
// });

app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newTable = req.body;
  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  // newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();
  console.log(newTable);
  console.log(tables.length)
  if(tables.length < 5){
    tables.push(newTable);
  }else{
    reserve.push(newTable)
  }
  res.json(newTable);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});