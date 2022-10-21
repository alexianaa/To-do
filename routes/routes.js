const routes = require("express").Router();
const taskRoutes = require("./taskRoutes");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");

routes.use('/', authRoutes);
routes.use('/user', userRoutes)
routes.use('/task', taskRoutes);

module.exports = routes