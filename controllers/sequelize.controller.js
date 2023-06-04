const sequelize = require("../infrastructure/sequelize/postgresql-connection");
const { Op } = require("sequelize");

const getSequelizeAuthenticate = async (req, res) => {
  console.log("getSequelizeAuthenticate");
  try {
    await sequelize.authenticate();
    console.log("succeeded");
    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.error("unable to connect to db: " + error);
    return res.status(400).json({ message: "fail" });
  }
};

const sequelizeGroupFunction = (fx, column, column_name) => {
  return [sequelize.fn(fx, sequelize.col(column)), column_name];
};

module.exports = {
  getSequelizeAuthenticate,
  sequelizeGroupFunction,
};