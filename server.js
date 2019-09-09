// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.route('/api/timestamp/:date?')
  .get(function (req, res){
    
    var date = null;
    // revisamos si esta vacia la fecha que nos dan
    if (req.params.date !== undefined) {

      
      var date_t = req.params.date;
      //si es formato unix
      if(!isNaN(parseInt(req.params.date))){
        date_t=parseInt(date_t);
      }
      //convertimos a objeto fecha
      date = new Date(date_t);
      
      
    } else {
      
      //si no nos dan fecha pasamos la actual
      date = new Date(Date.now());
    }
    
    // en caso de que no pasaran un formato de fecha 
    // no valido 

    var response = date == "Invalid Date" ? 
      { error: "Invalid Date" } :
      { "unix": date.getTime(),
        "utc": date.toUTCString()
      };
    
    res.json(response);
  });
  

// 404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});



// your first API endpoint... 
app.get('/api/hello', function (req, res) {
  console.log("called")
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});