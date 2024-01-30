import HttpError from './HttpError';

/**
 * @class Class representing an HTTP forbidden error.
 * @description This class is used for creating an instance of an HTTP error with a status code of 403, which indicates that the server understood the request, but it refuses to authorize it. This status is similar to 401 (Unauthorized), but indicates that the client must authenticate itself to get the requested response. A 403 response is not a guarantee that the client will be able to access the requested resource; a server that wishes to make public why the request has been forbidden can describe that reason in the response payload (if any).
 * @see {@link [https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403] | MDN Web Docs: HTTP Status Code 403: Forbidden}
 * @extends HttpError
 * @example Throwing a default forbidden error: throw new HttpForbiddenError();
 * @example Throwing a forbidden error with a custom message: throw new HttpForbiddenError('Custom message');
 * @example Throwing a forbidden error with a custom message and additional data: throw new HttpForbiddenError('Custom message', { custom: 'data' });
 */
class HttpForbiddenError extends HttpError {
  constructor (message: string | undefined = 'Forbidden', error?: { [key: string]: string; }) {
    super("HttpForbiddenError", 403, message, error);
  }
}

export default HttpForbiddenError;
