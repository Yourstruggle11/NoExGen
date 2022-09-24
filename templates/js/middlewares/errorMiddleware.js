const notFound = (req, res, next) => {
    const err = new Error(`Not Found : ${req.originalUrl}`)
    err.status = 404
    throw err
}

const errorHandler = (err, req, res, next) => {
    const statusCode = err.status === 200 ? 500 : err.status
    res.status(statusCode)
    res.json({
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    notFound,
    errorHandler
}
