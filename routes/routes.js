const routes = require("express").Router();
const taskRoutes = require("./taskRoutes");
const userRoutes = require("./userRoutes");

routes.use('/task', taskRoutes);
routes.use('/user', userRoutes);

module.exports = routes