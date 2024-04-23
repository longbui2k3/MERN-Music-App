const { startSession } = require("mongoose");

const transaction = async (fn) => {
  const session = await startSession();
  session.startTransaction();
  try {
    const result = await fn(session);
    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (err) {
    await session.commitTransaction();
    await session.endSession();
    throw err;
  }
};

module.exports = transaction;
