const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { dataFilter } = require('../middlewares/dataFilter');

// [POST] ĐĂNG NHẬP
exports.login = async (req, res, next) => {
    try {
        let filter = dataFilter(req.body, {
            username: 'string',
            password: 'string',
        });
        const user = await User.findOne({
            username: filter.username,
        });
        if (!user) {
            const err = new Error('Tên đăng nhập không tồn tại');
            err.statusCode = 400;
            return next(err);
        }
        if (
            filter.password &&
            bcrypt.compareSync(filter.password, user.password)
        ) {
            const token = jwt.sign(
                { userId: user._id, role: user.role, area: user.area || null },
                process.env.APP_SECRET
            );
            res.status(200).json({
                status: 'success',
                type: 'object',
                message: 'Đăng nhập thành công',
                data: {
                    token,
                    username: user.username,
                    role: user.role,
                },
            });
        } else {
            const err = new Error('Mật khẩu không đúng');
            err.statusCode = 400;
            return next(err);
        }
    } catch (error) {
        next(error);
    }
};

// [POST] ĐĂNG XUẤT
exports.logout = async (req, res, next) => {
    res.status(200).json({
        status: 'success',
        type: 'message',
        message: 'Đăng xuất thành công',
        data: null,
    });
};

exports.getCurrentUser = async (req, res, next) => {
    try {
        const data = { user: null };
        if (req.user) {
            const user = await User.findById(req.user.userId);
            data.user = { username: user.username };
        }
        res.status(200).json({
            status: 'success',
            data: data,
        });
    } catch (error) {
        res.json(error);
    }
};
