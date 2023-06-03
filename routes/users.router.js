const express = require('express');
const usersRouter = express.Router();

const usersController = require("../controllers/users.controller");

usersRouter.post(
  "/handleLogin",
  usersController.handleLogin
);

usersRouter.post(
  "/deleteUser",
  usersController.deleteUser
);

module.exports = usersRouter;