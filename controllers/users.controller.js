const User = require("../models/user.ts");

const createNewUser = async (req, res) => {
  // Get input from form
  // const { username, password } = req.body;
  const username = "test" + Date.now();
  const password = "testpassword";
  console.log("createNewUser for: " + username);
  // Add user to model
  const newUser = User.build({
    username: username,
    password: password,
  });
  // Send user to db
  await newUser.save();
  console.log("createNewUser success");
};

module.exports = {
  createNewUser,
};