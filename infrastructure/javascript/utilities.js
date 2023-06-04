const StringCrypto = require("string-crypto");
const dotenv = require("dotenv");
dotenv.config();

const requireUser = (user_id) => {
  if (user_id) {
    return;
  } else {
    // If no one is signed in, then forbid access to page
    throw { message: "No user is logged in" };
  }
};

const hashPassword = (username, password) => {
  const encryptPassword = process.env.HASH_ENCRYPT_PASSWORD;
  const { encryptString } = new StringCrypto({
    salt: username,
    iterations: 10,
    digest: "sha256",
  });
  let hashPassword = encryptString(password, encryptPassword);
  return hashPassword;
};

const checkPassword = (username, password, hashPassword) => {
  const encryptPassword = process.env.HASH_ENCRYPT_PASSWORD;
  const { decryptString } = new StringCrypto({
    salt: username,
    iterations: 10,
    digest: "sha256",
  });
  let decryptedString = decryptString(hashPassword, encryptPassword);
  return decryptedString === password;
};

module.exports = {
  requireUser,
  hashPassword,
  checkPassword,
};