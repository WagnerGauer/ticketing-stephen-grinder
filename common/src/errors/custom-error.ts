export abstract class CustomError extends Error {
  abstract statusCode: number;

  // The requirement that there be string given as a parameter to the
  // constructor method is only for logging purposes
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
