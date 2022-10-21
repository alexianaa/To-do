const routes = require("express").Router();
const AuthController = require("../controller/AuthController");

routes.get("/", AuthController.signIn);
routes.get("/singOut", AuthController.signOut);
routes.get("/register", AuthController.register);
routes.post("/login", AuthController.auth);
routes.post("/createUser", AuthController.createUser);

module.exports = routes;