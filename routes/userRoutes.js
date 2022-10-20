const routes = require("express").Router();
//const TaskController = require("../controller/TaskController");

routes.get("/", async(req,res) => {
    try {
        res.send({message: 'Bem vindo'})
    } catch (error) {
        
    }
});   

module.exports = routes;