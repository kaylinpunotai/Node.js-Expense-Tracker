const express = require('express');
const sequelizeRouter = express.Router();

const sequelizeController = require("../controllers/sequelize.controller");

/* POST sequelize authentitcate */
sequelizeRouter.post(
  "/authenticate",
  sequelizeController.getSequelizeAuthenticate
);

module.exports = sequelizeRouter;