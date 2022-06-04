exports.adminAuth = (req, res, next) => {
    if (req.user.role !== 'admin') {
        const err = new Error('Chỉ quản trị viên được truy cập vào đây');
        err.statusCode = 401;
        return next(err);
    }
    next();
};
