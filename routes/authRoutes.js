const routes = require("express").Router();
const AuthController = require("../controller/AuthController");

routes.get("/", (req,res) => {
    return res.send({message: 'Bem vindo'})
});
routes.post("/login", AuthController.auth);
routes.post("/register", AuthController.createUser);

module.exports = routes;