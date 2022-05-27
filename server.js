const express = require('express'); //Line 1
const app = express(); //Line 2
const path = require('path');
const port = process.env.PORT || 5000; //Line 3
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(require(path.join(__dirname,"routes/record")));

app.use(express.static(path.join(__dirname, 'client/build')));

// create a GET route
app.get('/', (req, res) => { //Line 9
    // res.send("HELLO THERE")

    // res.send(__dirname)
    res.sendFile(path.join(__dirname+"/client/build/index.html"));
  }); //Line 11

// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11



// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6