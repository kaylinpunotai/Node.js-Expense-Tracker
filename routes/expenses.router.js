const express = require('express');
const expensesRouter = express.Router();

const expensesController = require("../controllers/expenses.controller");

expensesRouter.post(
  "/createNewExpense",
  expensesController.createNewExpense
);

expensesRouter.post(
  "/updateExpense",
  expensesController.updateExpense
);

expensesRouter.post(
  "/deleteExpense",
  expensesController.deleteExpense
);

module.exports = expensesRouter;