const routes = require("express").Router();
const TaskController = require("../controller/TaskController");
const authMiddleware = require("../middleware/auth");

//routes.use(authMiddleware);

routes.get("/:user", TaskController.getAllTasks);
routes.post("/create/:user", TaskController.createTask);
routes.get("/getById/:id/:method/:user", TaskController.getById);
routes.post("/updateOne/:id/:user", TaskController.updateOneTask);
routes.get("/deleteOne/:id/:user", TaskController.deleteOneTask);
routes.get("/check/:id/:user", TaskController.taskCheck);        

module.exports = routes;