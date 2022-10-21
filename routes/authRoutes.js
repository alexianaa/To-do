const routes = require("express").Router();
const AuthController = require("../controller/AuthController");

routes.get("/", AuthController.sign);
routes.get("/register", AuthController.register);
routes.post("/login", AuthController.auth);
routes.post("/createUser", AuthController.createUser);

module.exports = routes;