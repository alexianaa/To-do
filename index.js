const express = require('express')
const path = require('path')
const routes = require("./routes/routes")

const app = express()
const port = 3000

app.set("view engine", "ejs") // reconhecer arquivo ejs
app.use(express.static(path.join(__dirname,"public"))) // conectar css com arquivo html
app.use(routes)

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
});