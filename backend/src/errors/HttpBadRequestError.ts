import HttpError from './HttpError';

/**
 * @class HttpBadRequestError
 * @extends HttpError
 * @example throw new HttpBadRequestError('Invalid email', { email: 'Invalid email' });
 * @example throw new HttpBadRequestError('Invalid email');
 * @example throw new HttpBadRequestError();
 */
class HttpBadRequestError extends HttpError {
  constructor (message: string | undefined = 'Bad Request', error: { [key: string]: string; }) {
    super("HttpBadRequestError", 400, message, error);
  }
}

export default HttpBadRequestError;
