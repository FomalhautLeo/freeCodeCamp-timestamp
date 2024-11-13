// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const e = require('express');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", function (req, res) {
  const date = req.params.date;
  console.log("Get param: ", req.params);
  let dateObj = {};
  if (/^\d+$/.test(date)) {
    console.log("  Get ms date: ", date);
    dateObj = new Date(Number(date));
  } else if (!date) {
    console.log("  Get empty date");
    dateObj = new Date();
  } else {
    console.log("  Get string date: ", date);
    dateObj = new Date(date);
  }
  let resObj = {};
  if (dateObj.toString() !== 'Invalid Date') {
    resObj = { unix: dateObj.getTime(), utc: dateObj.toUTCString() };
  } else {
    resObj = { error: "Invalid Date" };
  }
  console.log("  Send: ", JSON.stringify(resObj));
  res.json(resObj);
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
