const Expense = require("../models/expense.ts");

const createNewExpense = async (req, res) => {
  // Get input from form
  const { 
    // user_id,
    amount,
    category,
    description,
    transaction_date,
    merchant,
    notes,
    charged_account_name
  } = req.body;
  const user_id = req.session.user_id;
  // const amount = 12.34;
  // const category = "Restaurant";
  // const description = "Burger & fries";
  // const transaction_date = "1/1/2023";
  // const merchant = "McDonald's";
  // const notes = "Paid for Alice's fries";
  // const charged_account_name = "Citi Credit Card";

  // Add expense to model
  const newExpense = Expense.build({
    user_id: user_id,
    amount: amount,
    category: category,
    description: description,
    transaction_date: transaction_date,
    merchant: merchant,
    notes: notes,
    charged_account_name: charged_account_name,
  });
  // Send user to db
  try {
    await newExpense.save();
    // Save new expense list to session
    req.session.expenses = await getAllExpenses(req.session.user_id);
    return res.redirect("/home");
  } catch (err) {
    req.session.error = err;
    return res.redirect("/error");
  }
};

const updateExpense = async (req, res) => {
  // Get input from form
  const { 
    expense_id,
    amount,
    category,
    description,
    transaction_date,
    merchant,
    notes,
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
    description: description,
    transaction_date: transaction_date,
    merchant: merchant,
    notes: notes,
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
    return res.redirect('/');
  } catch (err) {
    // Set session error
    req.session.error = err;
    // Redirect to error page
    return res.redirect('/error', { error: err });
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

module.exports = {
  createNewExpense,
  updateExpense,
  deleteExpense,
  getAllExpenses,
};