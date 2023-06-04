var express = require('express');
var indexRouter = express.Router();

const expensesRouter = require("./expenses.router");
const sequelizeRouter = require("./sequelize.router");
const usersRouter = require("./users.router");

const { requireUser } = require("../infrastructure/javascript/utilities");

/* GET root home page. */
indexRouter.get('/', function(req, res, next) {
  if (req.session.error) {
    // Display errors, eg username already taken or incorrect password
    res.render('index', { error: req.session.error.message });
  } else {
    res.render("index", { error: null});
  }
});

/* GET user-home page. */
indexRouter.get('/home', function(req, res, next) {
  try {
    requireUser(req.session.user_id);
  } catch (err) {
    res.render("error", { error: err });
  }
  
  const { user_id, username, expenses } = req.session;
  res.render('user-home', { user_id: user_id, username: username, entries: expenses });
});

/* GET new-expense-form page. */
indexRouter.get('/new-expense-form', function(req, res, next) {
  try {
    requireUser(req.session.user_id);
  } catch (err) {
    res.render("error", { error: err });
  }
  
  res.render("new-expense-form");
});

/* POST edit-expense-form page. */
indexRouter.post('/edit-expense-form', function(req, res, next) {
  try {
    requireUser(req.session.user_id);
  } catch (err) {
    res.render("error", { error: err });
  }
  res.render("edit-expense-form", req.body);
});

/* GET error page. */
indexRouter.get('/error', function(req, res, next) {
  const { error } = req.session;
  res.render('error', { error: error });
});

indexRouter.use("/expenses", expensesRouter);
indexRouter.use("/sequelize", sequelizeRouter);
indexRouter.use("/users", usersRouter);

module.exports = indexRouter;
