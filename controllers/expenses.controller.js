const Expense = require("../models/expense.ts");

const createNewExpense = async (req, res) => {
  // Get input from form
  // const { 
  //   user_id,
  //   amount,
  //   category,
  //   description,
  //   transaction_date,
  //   merchant,
  //   notes,
  //   charged_account_name
  // } = req.body;
  const username = "test1685809420308";
  const user_id = 2;
  const amount = 12.34;
  const category = "Restaurant";
  const description = "Burger & fries";
  const transaction_date = "1/1/2023";
  const merchant = "McDonald's";
  const notes = "Paid for Alice's fries";
  const charged_account_name = "Citi Credit Card";
  console.log("createNewExpense for: " + username);
  // Add user to model
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
    return res.status(200).json({ message: "createNewExpense success" });
  } catch (err) {
    return res.status(400).json({ err: err });
  }
};

module.exports = {
  createNewExpense,
};