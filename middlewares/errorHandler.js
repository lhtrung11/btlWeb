exports.errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if (err.code === 11000) {
        err.statusCode = 400;
        err.type = 'message';
        for (let p in err.keyValue) {
            err.message = `${p} bị trùng`;
        }
    }

    if (err.errors) {
        err.statusCode = 400;
        err.message = [];
        err.type = 'array';
        for (let p in err.errors) {
            err.message.push(err.errors[p].properties.message);
        }
    }

    res.status(err.statusCode).json({
        status: 'error',
        type: err.type,
        message: err.message,
        data: null,
    });
};
