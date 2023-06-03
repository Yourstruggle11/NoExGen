const ErrorHandler = require('./ErrorClass.js');

const notFound = (req, res, next) => {
    next(ErrorHandler.notFoundError(`Not found - ${req.originalUrl}`));
}

const errorHandler = (err, req, res, next) => {
    if (err instanceof ErrorHandler) {
        res.status(err.status).json({
            success: false,
            message: err.message,
            status: err.status
        });
    } else {
        res.status(500).json({
            success: false,
            message: err.message,
            status: err.status || 500
        });
    }
    console.log('error: ', err.message);
}

module.exports = {
    notFound,
    errorHandler
}
