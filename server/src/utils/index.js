"use strict";
const _ = require("lodash");

const getInfoData = ({ object = {}, fields = [] }) => {
  return _.pick(object, fields);
};
const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((val) => [val, 1]));
};

const getUnselectData = (select = []) => {
  return Object.fromEntries(select.map((val) => [val, 0]));
};
const removeUndefinedInObject = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) delete obj[key];
  });
  return obj;
};
module.exports = {
  getInfoData,
  getSelectData,
  getUnselectData,
  removeUndefinedInObject,
};
