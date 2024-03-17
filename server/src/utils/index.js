"use strict";

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
  getSelectData,
  getUnselectData,
  removeUndefinedInObject,
};
