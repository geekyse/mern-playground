import http from 'http';

export class HttpError extends Error {
    errors: any[];
    status: number;
    message: string;
    name: 'HttpError';

    /**
     * Creates an instance of HttpError.
     * @param {number} status
     * @param {string} message
     * @param {array} errors
     * @memberOf HttpError
     */
    constructor(status?: number, message?: string, errors?: any[]) {
        super(message);

        Error.captureStackTrace(this, this.constructor);

        this.errors = errors || [];
        this.status = status || 500;
        this.message = message || http.STATUS_CODES[this.status] || 'Error';
        // this.name = name || '';
    }
}
