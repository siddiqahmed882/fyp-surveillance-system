import HttpError from './HttpError';

/**
 * @class Class representing an HTTP unauthorized error.
 * @description This class is used for creating an instance of an HTTP error with a status code of 401, which indicates that the request has not been applied because it lacks valid authentication credentials for the target resource. This status is similar to 403 (Forbidden), but specifically for cases where authentication is required and has failed or has not yet been provided. Use 401 when the client must authenticate itself to get the requested response and 403 when the server understood the request, but it refuses to authorize it.
 * @see {@link [https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401] | MDN Web Docs: HTTP Status Code 401: Unauthorized}
 * @extends HttpError
 * @example Throwing a default unauthorized error: throw new HttpUnauthorizedError();
 * @example Throwing an unauthorized error with a custom message: throw new HttpUnauthorizedError('Custom message');
 * @example Throwing an unauthorized error with a custom message and additional data: throw new HttpUnauthorizedError('Custom message', { custom: 'data' });
 */
class HttpUnauthorizedError extends HttpError {
  constructor (message: string | undefined = 'Unauthorized', error?: { [key: string]: string; }) {
    super("HttpUnauthorizedError", 401, message, error);
  }
}

export default HttpUnauthorizedError;
