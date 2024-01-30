import HttpError from './HttpError';

/**
 * @class Class representing an HTTP not found error.
 * @extends HttpError
 * @example Throwing a default not found error: throw new HttpNotFoundError();
 * @example Throwing a not found error with a custom message: throw new HttpNotFoundError('Custom message');
 * @example Throwing a not found error with a custom message and additional data: throw new HttpNotFoundError('Custom message', { custom: 'data' });
 */
class HttpNotFoundError extends HttpError {
  constructor (message: string | undefined = 'Not Found', error?: { [key: string]: string; }) {
    super('HttpNotFoundError', 404, message, error);
  }
}

export default HttpNotFoundError;
