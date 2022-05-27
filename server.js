const express = require('express'); //Line 1
const app = express(); //Line 2
const path = require('path');
const port = process.env.PORT || 5000; //Line 3
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
const dbo = require("./db/conn");
app.use(express.static(path.join(__dirname, 'client/build')));


// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11

app.get('*', (req, res) => { //Line 9
  res.sendFile(path.join(__dirname+"/client/build/index.html"));
}); //Line 11


// This displays message that the server running and listening to specified port
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});