class ErrorHandler {
    constructor(status, message = 'An error occurred') {
        this.status = status;
        this.message = message;
    }

    static badRequestError(
        message = 'The request could not be understood or was missing required parameters.'
    ) {
        throw new ErrorHandler(400, message);
    }

    static conflictError(
        message = 'The request could not be completed due to a conflict with the current state of the target resource.'
    ) {
        throw new ErrorHandler(409, message);
    }

    static validationError(message = 'One or more fields failed validation.') {
        throw new ErrorHandler(422, message);
    }

    static notFoundError(message = 'The requested resource could not be found.') {
        throw new ErrorHandler(404, message);
    }

    static serverError(message = 'An internal server error occurred.') {
        throw new ErrorHandler(500, message);
    }

    static forbidden(
        message = 'You do not have permission to access this resource.'
    ) {
        throw new ErrorHandler(403, message);
    }
}

export default ErrorHandler;