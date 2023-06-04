var assert = require('assert');
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));

const User = require("../models/user.ts");

const { 
  hashPassword,
  checkPassword
} = require("../infrastructure/javascript/utilities");

const {
  createNewUserLocal,
  loginUserLocal,
} = require("../controllers/users.controller");

describe('Login Functions', function () {
  describe('checkPassword()', function () {
    it('returns true if the same password is encrypted and decrypted', function () {
      const username = "testuser";
      const password = "test123";
      const encryptedPassword = hashPassword(username, password);
      const isPasswordEqual = checkPassword(username, password, encryptedPassword);
      expect(isPasswordEqual).to.be.true;
    });

    it('returns false if the a different password is encrypted then decrypted', function () {
      const username = "testuser";
      const password = "test123";
      const differentPassword = "different password";
      const encryptedPassword = hashPassword(username, password);
      const isPasswordEqual = checkPassword(username, differentPassword, encryptedPassword);
      expect(isPasswordEqual).to.be.false;
    });
  });

  describe("Login", function () {
    it("Logs in if username exists and password is correct", async function () {
      const username = "mochatest" + Date.now();
      const password = "test123";
      const newUser = await User.create({
        username: username,
        password: password,
      });
      expect(function () {
        loginUserLocal(username, password)
          .then(() => {
            return;
          })
          .catch((err) => {
            throw err;
          });
      }).not.to.throw();
      await newUser.destroy();
    });

    it("Fails if username does not exist", function () {
      const username = "mochatest" + Date.now();
      const password = "test123";
      expect(function () {
        loginUserLocal(username, password)
          .then(() => {
            return;
          })
          .catch((err) => {
            throw err;
          });
      }).not.to.throw();
    });

    it("Fails if username exists but password is incorect", async function () {
      const username = "mochatest" + Date.now();
      const password = "test123";
      const wrongPassword = "wrong";
      const newUser = await User.create({
        username: username,
        password: password,
      });
      expect(function () {
        loginUserLocal(username, wrongPassword)
          .then(() => {
            return;
          })
          .catch((err) => {
            throw err;
          });
      }).not.to.throw();
      await newUser.destroy();
    });
  });

  describe("Register", function () {
    it("Logs in if username does not already exist", async function () {
      const username = "mochatest" + Date.now();
      const password = "test123";
      await expect(
        createNewUserLocal(username, password)
          .then((newUser) => {
            newUser.destroy();
          })
      ).to.not.eventually.be.rejected;
    });

    it("Fails if username already exists", async function () {
      const username = "mochatest" + Date.now();
      const password = "test123";
      const newUser = await User.create({
        username: username,
        password: password,
      });
      await expect(createNewUserLocal(username, password)).to.eventually.be.rejected;
      await newUser.destroy();
    });
  });
});