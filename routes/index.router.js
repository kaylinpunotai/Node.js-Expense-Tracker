var express = require('express');
var indexRouter = express.Router();

const expensesRouter = require("./expenses.router");
const sequelizeRouter = require("./sequelize.router");
const usersRouter = require("./users.router");

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

indexRouter.use("/expenses", expensesRouter);
indexRouter.use("/sequelize", sequelizeRouter);
indexRouter.use("/users", usersRouter);

module.exports = indexRouter;
