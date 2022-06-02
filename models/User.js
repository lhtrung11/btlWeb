const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Tên tài khoản không được để trống"],
    },
    password: {
        type: String,
        required: [true, "Mật khẩu không được để trống"],
    },
    role: {
        type: String,
        required: [true, "Tài khoản chưa có quyền hạn"],
        default: "user",
    },
    isActive: {
        type: Boolean,
        required: [true, "Chưa cài đặt trạng thái tài khoản"],
        default: "true",
    },
    area: {
        type: String,
        default: "Chưa có",
    },
});

userSchema.pre("save", function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, function (error, hash) {
        if (error) {
            return next(error);
        } else {
            user.password = hash;
            next();
        }
    });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
