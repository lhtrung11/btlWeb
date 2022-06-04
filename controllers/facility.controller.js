const Facility = require('../models/Facility');
const { dataFilter } = require('../middlewares/dataFilter');

// [POST] TẠO MỘT CƠ SỞ MỚI MỚI
exports.createFacility = async (req, res, next) => {
    try {
        const document = dataFilter(req.body, {
            name: 'string',
            contact: 'string',
            business: 'string',
            address: 'object',
            area: 'string',
        });
        const facility = await Facility.create(document);
        res.status(200).json({
            status: 'success',
            type: 'object',
            message: 'Tạo tài khoản thành công',
            data: { facility },
        });
    } catch (error) {
        next(error);
    }
};

// [GET] LẤY TẤT CẢ THÔNG TIN USER (CÓ QUERY)
exports.getAllUsers = async (req, res, next) => {
    try {
        const query = dataFilter(req.query, {
            role: 'string',
            isActive: 'boolean',
            area: 'string',
        });
        const users = await User.find(query);
        if (users.length !== 0) {
            res.status(200).json({
                type: 'array',
                message: 'Lấy dữ liệu thành công',
                length: users.length,
                data: { users },
            });
        } else {
            res.status(200).json({
                type: 'message',
                message: 'Không có dữ liệu phù hợp',
                data: null,
            });
        }
    } catch (error) {
        next(error);
    }
};

// [GET] LẤY THÔNG TIN USER (THEO ID)
exports.getUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const filter = 'username role isActive area';
        const user = await User.findById(userId, filter);
        res.status(200).json({
            status: 'success',
            type: 'object',
            message: 'Lấy dữ liệu thành công',
            data: { user },
        });
    } catch (error) {
        next(error);
    }
};

// [PUT] CẬP NHẬT THÔNG TIN USER (THEO ID)
exports.updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const document = dataFilter(req.body, {
            isActive: 'boolean',
            area: 'string',
        });
        const filter = 'username role isActive area';
        const user = await User.findByIdAndUpdate(userId, document, {
            new: true,
            runValidators: true,
        }).select(filter);
        res.status(200).json({
            status: 'success',
            type: 'object',
            message: 'Cập nhật dữ liệu thành công',
            data: { user },
        });
    } catch (error) {
        next(error);
    }
};

// [DELETE] XÓA THÔNG TIN USER (THEO ID)
exports.deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        await User.findByIdAndDelete(userId);
        res.status(200).json({
            status: 'success',
            type: 'message',
            message: 'Xóa dữ liệu thành công',
            data: null,
        });
    } catch (error) {
        next(error);
    }
};
