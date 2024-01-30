import HttpError from './HttpError';

/**
 * @class Class representing an HTTP conflict error.
 * @extends HttpError
 * @example Throwing a default conflict error: throw new HttpConflictError();
 * @example Throwing a conflict error with a custom message: throw new HttpConflictError('Custom message');
 * @example Throwing a conflict error with a custom message and additional data: throw new HttpConflictError('Custom message', { custom: 'data' });
 */
class HttpConflictError extends HttpError {
  constructor (message: string | undefined = 'Conflict', error?: { [key: string]: string; }) {
    super("HttpConflictError", 409, message, error);
  }
}

export default HttpConflictError;
