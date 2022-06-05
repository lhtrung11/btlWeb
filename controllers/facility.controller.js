const Facility = require('../models/Facility');
const { dataFilter } = require('../middlewares/dataFilter');
const { checkPermission } = require('../middlewares/checkPermission');

// [POST] TẠO MỘT CƠ SỞ MỚI MỚI
exports.createFacility = async (req, res, next) => {
    try {
        const document = dataFilter(req.body, {
            name: 'string',
            contact: 'string',
            business: 'string',
            address: 'object',
            area: 'string',
            license: 'object',
        });
        const facility = await Facility.create(document);
        console.log(facility);
        res.status(200).json({
            status: 'success',
            type: 'object',
            message: 'Tạo cơ sở mới thành công',
            data: { facility },
        });
    } catch (error) {
        next(error);
    }
};

// [GET] LẤY TẤT CẢ THÔNG TIN CƠ SỞ (CÓ QUERY)
exports.getAllFacilities = async (req, res, next) => {
    try {
        const query = dataFilter(req.query, {
            area: 'string',
            ward: 'string',
            name: 'string',
            business: 'string',
            license: 'boolean',
        });
        let facilities;
        if (checkPermission(req.user, query.area)) {
            facilities = await Facility.find(query);
        } else {
            facilities = [];
        }

        if (facilities.length !== 0) {
            res.status(200).json({
                type: 'array',
                message: 'Lấy dữ liệu thành công',
                length: facilities.length,
                data: { facilities },
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

// [GET] LẤY THÔNG TIN CƠ SỞ (THEO ID)
exports.getFacility = async (req, res, next) => {
    try {
        const { facilityId } = req.params;
        let facility = await Facility.findById(facilityId);
        if (!checkPermission(req.user, facility.area)) {
            facility = {};
        }
        res.status(200).json({
            status: 'success',
            type: 'object',
            message: 'Lấy dữ liệu thành công',
            data: { facility },
        });
    } catch (error) {
        next(error);
    }
};

// [PUT] CẬP NHẬT THÔNG TIN CƠ SỞ (THEO ID)
exports.updateFacility = async (req, res, next) => {
    try {
        const { facilityId } = req.params;
        const document = dataFilter(req.body, {
            name: 'string',
            business: 'string',
            address: 'string',
            contact: 'string',
        });
        let facility = await Facility.findById(facilityId);
        if (checkPermission(req.user, facility.area)) {
            facility = await Facility.findByIdAndUpdate(facilityId, document, {
                new: true,
                runValidators: true,
            });
            res.status(200).json({
                status: 'success',
                type: 'object',
                message: 'Cập nhật dữ liệu thành công',
                data: { facility },
            });
        } else {
            res.status(200).json({
                status: 'success',
                type: 'message',
                message: 'Không có đủ quyền để cập nhật cho đối tượng này',
                data: null,
            });
        }
    } catch (error) {
        next(error);
    }
};

// [PATCH] CẬP NHẬT GIẤY CHỨNG NHẬN (THEO ID)
exports.updateLicense = async (req, res, next) => {
    try {
        const { facilityId } = req.params;
        const document = dataFilter(req.body, {
            business: 'string',
            issueDate: 'date',
            expireDate: 'date',
            isActive: 'boolean',
        });
        const filter = 'license';
        let facility = await Facility.findById(facilityId);
        if (checkPermission(req.user, facility.area)) {
            facility = await Facility.findByIdAndUpdate(
                facilityId,
                { license: document },
                {
                    new: true,
                    runValidators: true,
                }
            ).select(filter);
            res.status(200).json({
                status: 'success',
                type: 'object',
                message: 'Cập nhật giấy chứng nhận thành công',
                data: { facility },
            });
        }
    } catch (error) {
        next(error);
    }
};

// [DELETE] XÓA THÔNG TIN CƠ SỞ (THEO ID)
exports.deleteFacility = async (req, res, next) => {
    try {
        const { facilityId } = req.params;
        let facility = await Facility.findById(facilityId);
        if (checkPermission(req.user, facility.area)) {
            await Facility.findByIdAndDelete(facilityId);
            res.status(200).json({
                status: 'success',
                type: 'message',
                message: 'Xóa dữ liệu cơ sở thành công',
                data: null,
            });
        } else {
            res.status(200).json({
                status: 'success',
                type: 'message',
                message: 'Không có đủ quyền để xóa đối tượng này',
                data: null,
            });
        }
    } catch (error) {
        next(error);
    }
};
