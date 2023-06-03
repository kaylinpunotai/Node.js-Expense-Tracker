const express = require('express');
const expensesRouter = express.Router();

const expensesController = require("../controllers/expenses.controller");

expensesRouter.post(
  "/createNewExpense",
  expensesController.createNewExpense
)

module.exports = expensesRouter;