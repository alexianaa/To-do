const routes = require("express").Router();
const UserController = require("../controller/UserController");
const authMiddleware = require("../middleware/auth");

routes.use(authMiddleware);

routes.get('/', (req,res) => {
    return res.send({message: 'Bem vindo, usuario', user: req.userId})
})
routes.get('/getAll', UserController.getAllUsers)

module.exports = routes;