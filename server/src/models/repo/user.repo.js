const { getSelectData } = require("../../utils");
const user = require("../userModel");

const findByEmail = async ({ email }) => {
  return await user.findOne({ email });
};

module.exports = {
  findByEmail,
};
