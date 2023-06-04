const express = require('express');
const expensesRouter = express.Router();

const expensesController = require("../controllers/expenses.controller");

expensesRouter.post(
  "/createNewExpense",
  expensesController.newExpenseFromForm
);

expensesRouter.post(
  "/updateExpense",
  expensesController.updateExpense
);

expensesRouter.post(
  "/deleteExpense",
  expensesController.deleteExpense
);

expensesRouter.post(
  "/createSampleExpenses",
  expensesController.createSampleExpenses
);

module.exports = expensesRouter;