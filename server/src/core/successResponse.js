"use strict";

const { ReasonPhrases, StatusCodes } = require("../utils/htttpStatusCode");

class SuccessResponse {
  constructor(
    status = StatusCodes.OK,
    reasonStatusCode = ReasonPhrases.OK,
    metadata = {}
  ) {
    this.status = status;
    this.message = reasonStatusCode;
    this.metadata = metadata;
  }

  send(res) {
    res.status(this.status).json(this);
  }
}

class CREATED extends SuccessResponse {
  constructor({
    message = ReasonPhrases.CREATED,
    metadata = {},
    status = StatusCodes.CREATED
  }
  ) {
    super(status, message, metadata);
  }
}

class OK extends SuccessResponse {
  constructor({
    message = ReasonPhrases.OK,
    metadata = {},
    status = StatusCodes.OK
  }) {
    super(status, message, metadata);
  }
}

module.exports = {
  SuccessResponse,
  CREATED,
  OK,
};
