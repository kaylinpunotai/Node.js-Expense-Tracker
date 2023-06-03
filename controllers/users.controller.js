const User = require("../models/user.ts");

const createNewUser = async (req, res) => {
  // Get input from form
  // const { username, password } = req.body;
  // const username = "test" + Date.now();
  const username = "test1685809420308";
  const password = "testpassword2";
  console.log("createNewUser for: " + username);
  // Add user to model
  const newUser = User.build({
    username: username,
    password: password,
  });
  // Send user to db
  try {
    await newUser.save();
    return res.status(200).json({ message: "createNewUser success" });
  } catch (err) {
    return res.status(400).json({ err: err });
  }
};

module.exports = {
  createNewUser,
};