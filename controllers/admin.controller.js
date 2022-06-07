const User = require('../models/User');
const Area = require('../models/Area');
const { dataFilter } = require('../middlewares/dataFilter');

// [POST] TẠO MỘT USER MỚI
exports.createUser = async (req, res, next) => {
    try {
        const document = dataFilter(req.body, {
            username: 'string',
            password: 'string',
            role: 'string',
            isActive: 'boolean',
            area: 'string',
        });
        const user = await User.create(document);
        res.status(200).json({
            status: 'success',
            type: 'object',
            message: 'Tạo tài khoản thành công',
            data: { user },
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
        const users = await User.find(query).sort({ username: 1 });
        if (users.length !== 0) {
            res.status(200).json({
                status: 'success',
                type: 'array',
                message: 'Lấy dữ liệu thành công',
                length: users.length,
                data: { users },
            });
        } else {
            res.status(200).json({
                status: 'success',
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
        const user = await User.findById(userId, filter).populate('area');
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
        if (user.area) {
            const area = await Area.findByIdAndUpdate(
                area,
                {
                    isManaged: true,
                    $push: { managers: userId },
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        }
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

// [POST] TẠO THÊM KHU VỰC MỚI
exports.createArea = async (req, res, next) => {
    try {
        const document = dataFilter(req.body, { name: 'string' });
        const area = await Area.create(document);
        res.status(200).json({
            status: 'success',
            type: 'object',
            message: 'Tạo khu vực thành công',
            data: { area },
        });
    } catch (error) {
        next(error);
    }
};

// [GET] LẤY TẤT CẢ THÔNG TIN KHU VỰC
exports.getAllAreas = async (req, res, next) => {
    try {
        const areas = await Area.find({}).sort({ name: 1, isManaged: 1 });
        res.status(200).json({
            status: 'success',
            type: 'array',
            length: areas.length,
            message: 'Lấy thông tin các khu vực thành công',
            data: { areas },
        });
    } catch (error) {
        next(error);
    }
};

// [GET] LẤY THÔNG TIN KHU VỰC (THEO ID)
exports.getArea = async (req, res, next) => {
    try {
        const { areaId } = req.params;
        const area = await Area.findById(areaId);
        res.status(200).json({
            status: 'success',
            type: 'object',
            message: 'Lấy thông tin khu vực thành công',
            data: { area },
        });
    } catch (error) {
        next(error);
    }
};

// [DELETE] XÓA KHU VỰC (THEO ID)
exports.deleteArea = async (req, res, next) => {
    try {
        const { areaId } = req.params;
        await Area.findByIdAndDelete(areaId);
        res.status(200).json({
            status: 'success',
            type: 'message',
            message: 'Xóa khu vực thành công',
            data: null,
        });
    } catch (error) {
        next(error);
    }
};
