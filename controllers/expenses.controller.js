const Expense = require("../models/expense.ts");
const sequelize = require("../infrastructure/sequelize/postgresql-connection");
const { Op } = require("sequelize");

const { 
  merchantCategoryList,
  accountChargedList,
  getRandomInt,
  getRandomDate,
} = require("../infrastructure/javascript/utilities");

const newExpenseFromForm = async (req, res) => {
  const user_id = req.session.user_id;
  // // Get input from form
  // const {
  //   amount,
  //   category,
  // //   description,
  //   transaction_date,
  //   merchant,
  // //   notes,
  //   charged_account_name
  // } = req.body;

  try {
    await createNewExpenseLocal(user_id, req.body);
    // Save new expense list to session
    req.session.expenses = await getAllExpenses(user_id);
    return res.redirect("/home");
  } catch (err) {
    req.session.error = { error: err };
    return res.redirect("/error");
  }
};

const createNewExpenseLocal = async (user_id, expense) => {
  // Add expense to model
  const newExpense = Expense.build({
    user_id: user_id,
    amount: expense.amount,
    category: expense.category,
    // description: expense.description,
    transaction_date: expense.transaction_date,
    merchant: expense.merchant,
    // notes: expense.notes,
    charged_account_name: expense.charged_account_name,
  });
  // Send user to db
  try {
    await newExpense.save();
    return;
  } catch (err) {
    throw { message: err };
  }
};

const updateExpense = async (req, res) => {
  // Get input from form
  const { 
    expense_id,
    amount,
    category,
    // description,
    transaction_date,
    merchant,
    // notes,
    charged_account_name
  } = req.body;
  // Get entry from model using expense_id
  const entry = await Expense.findOne({
    where: {
      expense_id: expense_id,
    },
  });
  // Set new inputs to model
  entry.set({
    amount: amount,
    category: category,
    // description: description,
    transaction_date: transaction_date,
    merchant: merchant,
    // notes: notes,
    charged_account_name: charged_account_name,
  });
  // Send user to db
  try {
    await entry.save();
    // Save new expense list to session
    req.session.expenses = await getAllExpenses(req.session.user_id);
    return res.redirect("/home");
  } catch (err) {
    req.session.error = err;
    return res.redirect("/error");
  }
};

const deleteExpense = async (req, res) => {
  try {
    // Delete entry based on expense_id
    await Expense.destroy({
      where: {
        expense_id: req.body.expense_id,
      },
    });
    // Save new expense list to session
    req.session.expenses = await getAllExpenses(req.session.user_id);
    // Redirect to index
    return res.redirect('/home');
  } catch (err) {
    // Set session error
    req.session.error = err;
    // Redirect to error page
    return res.redirect('/error');
  }
};

const getAllExpenses = async (user_id) => {
  try {
    const expenses = await Expense.findAll({
      where: {
        user_id: user_id,
      },
    });
    return expenses;
  } catch (err) {
    throw { message: err };
  }
};

const createSampleExpenses = async (req, res) => {
  const user_id = req.session.user_id;
  const { numToCreate } = req.body;

  try {
    // Create numToCreate entries
    for (let i = 0; i < numToCreate; i++) {
      let amount = getRandomInt(250) + Math.random();
      let transaction_date = getRandomDate();
      let accountChargedIndex = getRandomInt(accountChargedList.length);
      // console.log(accountChargedIndex);
      let charged_account_name = accountChargedList[accountChargedIndex];
      // console.log(charged_account_name);
      let merchantCategoryIndex = getRandomInt(Object.keys(merchantCategoryList).length);
      // console.log(merchantCategoryIndex);
      let { merchant, category } = merchantCategoryList[merchantCategoryIndex];
      // console.log(merchant);
      // console.log(category);

      // Generate sample values
      let expense = {
        amount: amount,
        category: category,
        // description: null,
        transaction_date: transaction_date,
        merchant: merchant,
        // notes: null,
        charged_account_name: charged_account_name,
      };
      // console.log(expense);
      // Create entry with generated values
      await createNewExpenseLocal(user_id, expense);
    }
    // Save new expense list to session
    req.session.expenses = await getAllExpenses(user_id);
    return res.redirect("/home");
  } catch (err) {
    req.session.error = { error: err };
    return res.redirect("/error");
  }
};

const selectReport = async (req, res) => {
  // Saves selected report to session
  const { report } = req.body;
  req.session.report = report;
  req.session.reportData = await displayReportCategory(req.session.user_id, req.session.report);
  return res.redirect("/reports");
};

const displayReportCategory = async (user_id, col) => {
  // Displays spending grouped by category
  const groupbyCategory = await Expense.findAll({
    attributes: [
        [col, "col"],
        [sequelize.fn("sum", sequelize.col("amount")), "total_charged_amount"]
    ],
    where: {
      user_id: user_id,
    },
    group: col,
    order: [
      ["total_charged_amount", "DESC"]
    ],
  });
  return groupbyCategory;
};

module.exports = {
  newExpenseFromForm,
  updateExpense,
  deleteExpense,
  getAllExpenses,
  createSampleExpenses,
  selectReport,
};