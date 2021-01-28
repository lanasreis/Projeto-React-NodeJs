
// Express é para construir as apis Rest
const express = require("express");

//Body-Parse analizar a solicitação e criar o req.body
const bodyParser = require("body-parser");

// Fornece middleware Express para habilitar CORS com várias opcoes
const cors = require("cors");



const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions));

// parse request of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to alana application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is runnig on port ${PORT}`);
})
