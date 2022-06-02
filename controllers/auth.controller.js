const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
    removeEmptyValue,
    removeInvalidKey,
    correctDataType,
} = require("../middlewares/dataFilter");

exports.login = async (req, res, next) => {
    try {
        let filter = req.body;
        filter = removeInvalidKey(filter, ["username", "password"]);
        filter = correctDataType(filter, {
            username: "string",
            password: "string",
        });
        filter = removeEmptyValue(filter);
        const user = await User.findOne({
            username: filter.username,
        });
        if (!user) {
            const err = new Error("Tên đăng nhập không tồn tại");
            err.statusCode = 400;
            return next(err);
        }
        if (
            filter.password &&
            bcrypt.compareSync(filter.password, user.password)
        ) {
            const token = jwt.sign(
                { userId: user._id, role: user.role },
                process.env.APP_SECRET
            );
            res.status(200).json({
                type: "object",
                message: "Đăng nhập thành công",
                data: {
                    token,
                    username: user.username,
                    role: user.role,
                },
            });
        } else {
            const err = new Error("Mật khẩu không đúng");
            err.statusCode = 400;
            return next(err);
        }
    } catch (error) {
        next(error);
    }
};

exports.logout = async (req, res, next) => {
    res.status(200).json({
        type: "message",
        message: "Đăng xuất thành công",
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
            status: "success",
            data: data,
        });
    } catch (error) {
        res.json(error);
    }
};
