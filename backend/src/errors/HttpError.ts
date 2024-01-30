/**
 * @class HttpError
 * @description This class is used for creating an instance of an HTTP error with a custom status code, message, and data.
 */
class HttpError extends Error {
  status: number;
  error?: { [key: string]: string; };

  constructor (name: string, status: number, message: string, error?: { [key: string]: string; }) {
    super(message);
    this.message = message;
    this.name = name;
    this.status = status;
    if (error) this.error = error;
    Error.captureStackTrace(this, HttpError);
  }
}

export default HttpError;
