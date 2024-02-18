"use strict";

const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((val) => [val, 1]));
};

const getUnselectData = (select = []) => {
  return Object.fromEntries(select.map((val) => [val, 0]));
};

module.exports = {
  getSelectData,
  getUnselectData,
};
