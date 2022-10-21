require('dotenv').config();
const express = require('express');
const path = require('path');
const routes = require("./routes/routes");
const bodyParser = require('body-parser');
const connectToDb = require("./database/db");

connectToDb();
const app = express();
const port = process.env.PORT;

app.set("view engine", "ejs"); // reconhecer arquivo ejs
app.use(express.static(path.join(__dirname,"public"))); // conectar css com arquivo html
app.use(express.urlencoded()) // receber formulario atraves do body
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
});