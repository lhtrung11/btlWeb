const User = require("../models/User");
const Area = require("../models/Area");
const {
    removeEmptyValue,
    removeInvalidKey,
    correctDataType,
} = require("../middlewares/dataFilter");

// [POST] TẠO MỘT USER MỚI
exports.createUser = async (req, res, next) => {
    try {
        let document = {
            ...req.body,
            role: "user",
            isActive: "true",
        };
        document = removeInvalidKey(document, [
            "username",
            "password",
            "role",
            "isActive",
            "area",
        ]);
        document = correctDataType(document, {
            username: "string",
            password: "string",
            role: "string",
            isActive: "boolean",
            area: "string",
        });
        document = removeEmptyValue(document);
        const user = await User.create(document);
        res.status(200).json({
            type: "object",
            message: "Tạo tài khoản thành công",
            data: { user },
        });
    } catch (error) {
        res.json({ error });
    }
};

// [GET] LẤY TẤT CẢ THÔNG TIN USER (CÓ QUERY)
exports.getAllUsers = async (req, res, next) => {
    try {
        // Lấy dữ liệu từ Request Query
        let filter = req.query;

        // Lọc các trường được phép
        filter = removeInvalidKey(filter, ["role", "isActive", "area"]);

        // Lọc các trường sai kiểu dữ liệu
        filter = correctDataType(filter, {
            role: "string",
            isActive: "boolean",
            area: "string",
        });

        // Lọc các trường rỗng
        filter = removeEmptyValue(filter);

        const users = await User.find(filter);

        // Dữ liệu trả về
        if (users.length !== 0) {
            // Có dữ liệu
            res.status(200).json({
                type: "array",
                message: "Lấy dữ liệu thành công",
                length: users.length,
                data: { users },
            });
        } else {
            // Không có dữ liệu
            res.status(200).json({
                type: "message",
                message: "Không có dữ liệu phù hợp",
            });
        }
    } catch (error) {}
};

// [GET] LẤY THÔNG TIN USER (THEO ID)
exports.getUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const filter = "username role isActive area";
        const user = await User.findById(userId, filter);
        res.status(200).json({
            type: "object",
            message: "Lấy dữ liệu thành công",
            data: { user },
        });
    } catch (error) {
        res.json({ error });
    }
};

// [PUT] CẬP NHẬT THÔNG TIN USER (THEO ID)
exports.updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        let document = req.body;
        document = removeInvalidKey(document, ["isActive", "area"]);
        document = correctDataType(document, {
            isActive: "boolean",
            area: "string",
        });
        document = removeEmptyValue(document);
        const filter = "username role isActive area";
        const user = await User.findByIdAndUpdate(userId, document, {
            new: true,
            runValidators: true,
        }).select(filter);
        res.status(200).json({
            type: "object",
            message: "Cập nhật dữ liệu thành công",
            data: { user },
        });
    } catch (error) {
        res.json({ error });
    }
};

// [DELETE] XÓA THÔNG TIN USER (THEO ID)
exports.deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        await User.findByIdAndDelete(userId);
        res.status(200).json({
            type: "message",
            message: "Xóa dữ liệu thành công",
        });
    } catch (error) {
        res.json({ error });
    }
};

exports.createArea = async (req, res, next) => {
    try {
        const document = {
            ...req.body,
        };
        const user = await User.create(document);
        res.status(200).json({
            type: "object",
            message: "Tạo tài khoản thành công",
            data: { user },
        });
    } catch (error) {
        res.json({ error });
    }
};
