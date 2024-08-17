"use strict";

const { ReasonPhrases, StatusCodes } = require("../utils/htttpStatusCode");

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class AuthFailureError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.UNAUTHORIZED,
    status = StatusCodes.UNAUTHORIZED
  ) {
    super(message, status);
  }
}

class ForbiddenError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.FORBIDDEN,
    status = StatusCodes.FORBIDDEN
  ) {
    super(message, status);
  }
}

class BadRequestError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.BAD_REQUEST,
    status = StatusCodes.BAD_REQUEST
  ) {
    super(message, status);
  }
}

class InternalServerError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.INTERNAL_SERVER_ERROR,
    status = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message, status);
  }
}

class FailedDependencyError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.FAILED_DEPENDENCY,
    status = StatusCodes.FAILED_DEPENDENCY
  ) {
    super(message, status);
  }
}

class NotFoundError extends ErrorResponse {
  constructor(
    message = ReasonPhrases.NOT_FOUND,
    status = StatusCodes.NOT_FOUND
  ) {
    super(message, status);
  }
}

module.exports = {
  AuthFailureError,
  ForbiddenError,
  BadRequestError,
  FailedDependencyError,
  InternalServerError,
  NotFoundError,
};
