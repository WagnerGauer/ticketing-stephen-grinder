import { CustomError } from "./custom-error";
import { ValidationError } from "express-validator";

export class RequestValidatonError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    // The requirement that there be string given as a parameter to super
    // is only for logging purposes
    super("Invalid request parameters");

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidatonError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.type === "field" ? err.path : "" };
    });
  }
}
