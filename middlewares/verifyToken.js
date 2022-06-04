const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    // Access Authorization from req header
    const Authorization = req.header('authorization');

    if (!Authorization) {
        const err = new Error('Chưa đăng nhập');
        err.statusCode = 401;
        return next(err);
    }

    const token = Authorization.replace('Bearer ', '');

    const { userId, role, area } = jwt.verify(token, process.env.APP_SECRET);

    req.user = { userId, role, area };
    next();
};
