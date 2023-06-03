const express = require('express');
const expensesRouter = express.Router();

const expensesController = require("../controllers/expenses.controller");


module.exports = expensesRouter;