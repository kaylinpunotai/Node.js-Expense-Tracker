const express = require('express');
const usersRouter = express.Router();

const usersController = require("../controllers/users.controller");

usersRouter.post(
  "/createNewUser",
  usersController.createNewUser
);

module.exports = usersRouter;