import HttpError from '../errors/HttpError';

class ApiErrorResponse {
  status: number;
  name: string;
  message: string;
  error?: { [key: string]: string; };

  constructor (error: HttpError) {
    this.name = error.name;
    this.status = error.status;
    this.message = error.message;
    console.log(error);
    if (error.error) this.error = error.error;
  }
}

export default ApiErrorResponse;