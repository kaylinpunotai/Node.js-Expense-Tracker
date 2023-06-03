const User = require("../models/user.ts");

const { hashPassword, checkPassword } = require("../infrastructure/javascript/utilities");

const handleLogin = (req, res) => {
  const { submit } = req.body;
  // Reset any errors
  req.session.error = null;

  // Go through submission buttons
  if (submit === "register") {
    const { username, password } = req.body;
    createNewUserLocal(username, password)
      .then((user) => {
        // Set session data
        req.session.user_id = user.user_id;
        req.session.username = username;
        // Redirect to user-home
        return res.redirect("/home");
      })
      .catch((err) => {
        // Set session error
        const error = err.errors[0];
        const message = error.message;
        // Set error message to display in browser
        if (message === "username must be unique") {
          req.session.error = { message: `${username} is already taken` };
        }
        // Redirect to index
        return res.redirect("/");
      });
  } else if (submit === "login") {
    const { username, password } = req.body;
    loginUserLocal(username, password)
      .then((user) => {
        // console.log(user);
        // Set session data
        req.session.user_id = user.user_id;
        req.session.username = username;
        // Redirect to user-home
        return res.redirect("/home");
      })
      .catch((err) => {
        // Set session error to display in browser
        console.log(err);
        req.session.error = err;
        // Redirect to index
        return res.redirect("/");
      });
  } else if (submit === "guest") {
    guestLoginLocal()
      .then((user) => {
        console.log(user);
        return res.redirect("/");
        // Set session data
        // req.session.user_id = user.user_id;
        // req.session.username = username;
        // // Redirect to user-home
        // return res.redirect("/home");
      })
      .catch((err) => {
        // Set session error to display in browser
        req.session.error = err;
        // Redirect to index
        return res.redirect("/");
      });
  } 
};

const createNewUserLocal = async (username, password) => {
  //// Test user login
  // const username = "test" + Date.now();
  // const password = "testpassword";
  console.log("createNewUser for: " + username);
  // Add user to model
  const newUser = User.build({
    username: username,
    password: password,
  });
  // Send user to db
  const userResult = await newUser.save();
  return userResult;
};

const loginUserLocal = async (username, password) => {
  // Get user from username
  const user = await User.findOne({
    where: {
      username: username
    },
  });
  if (user === null) {
    // Throw error if username not found
    throw { 
      type: "username",
      message: "Username not found" 
    };
  }
  // Check if password is the same
  const hashedPW = hashPassword(username, password);
  const isPWCorrect = checkPassword(username, password, user.password);
  if (isPWCorrect) {
    // If successful login, send user up
    return user;
  } else {
    // Throw error if password is incorrect
    throw { 
      type: "password",
      message: "Password is incorrect" 
    };
  }
};

const guestLoginLocal = () => {
  const username = "user5";
  const password = "test123";
  const hashPW = hashPassword(username, password);
  const check = checkPassword(username, password, hashPW);
  throw {
    message: check
  };
};

const deleteUser = async (req, res) => {
  try {
    // Delete user based on user_id
    await User.destroy({
      where: {
        user_id: req.session.user_id,
      },
    });
    // Reset session
    req.session.user_id = null;
    req.session.username = null;
    // Redirect to index
    return res.redirect('/');
  } catch (err) {
    // Set session error
    req.session.error = err;
    // Redirect to error page
    return res.redirect('/error', { error: err });
  }
};

module.exports = {
  handleLogin,
  deleteUser,
};