import http from 'http';

export class HttpError extends Error {
    errors: any[];
    status: number;
    message: string;

    constructor(status?: number, message?: string, errors?: any[]) {
        super(message);

        Error.captureStackTrace(this, this.constructor);

        this.errors = errors || [];
        this.status = status || 500;
        this.message = message || http.STATUS_CODES[this.status] || 'Error';
    }
}
