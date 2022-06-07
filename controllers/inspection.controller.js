const Inspection = require('../models/Inspection');
const Facility = require('../models/Facility');
const { dataFilter } = require('../middlewares/dataFilter');
const { checkPermission } = require('../middlewares/checkPermission');

// [POST] TẠO MỘT ĐỢT THANH TRA MỚI
exports.createInspection = async (req, res, next) => {
    try {
        const { area, role } = req.user;
        if (role === 'admin' || area) {
            const facility = await Facility.findById(req.body.facility);
            if (checkPermission(req.user, facility.area)) {
                const document = {
                    ...req.body,
                    status: {
                        isComplete: false,
                    },
                    tasks: {
                        visitFacility: false,
                    },
                };
                const inspection = await Inspection.create(document);
                res.status(200).json({
                    status: 'success',
                    type: 'object',
                    message: 'Tạo đợt thanh tra mới thành công',
                    data: { inspection },
                });
            } else {
                res.status(200).json({
                    status: 'success',
                    type: 'message',
                    message:
                        'Không có đủ quyền để tạo đơn thanh tra cho đối tượng này',
                    data: null,
                });
            }
        } else {
            const err = new Error('Không đủ quyền hạn để tạo đợt thanh tra');
            err.statusCode = 400;
            return next(err);
        }
    } catch (error) {
        next(error);
    }
};

// [GET] LẤY TẤT CẢ THÔNG TIN THANH TRA (CÓ QUERY)
exports.getAllInspections = async (req, res, next) => {
    try {
        const query = dataFilter(req.query, {
            area: 'string',
            facility: 'string',
            status: 'object',
            from: 'object',
        });
        let inspections;
        if (checkPermission(req.user, query.area)) {
            inspections = await Inspection.find(query).populate(
                'area facility'
            );
        } else {
            inspections = [];
        }

        if (inspections.length !== 0) {
            res.status(200).json({
                type: 'array',
                message: 'Lấy dữ liệu thành công',
                length: inspections.length,
                data: { inspections },
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

// [GET] LẤY THÔNG TIN THANH TRA (THEO ID)
exports.getInspection = async (req, res, next) => {
    try {
        const { inspectionId } = req.params;
        let inspection = await Inspection.findById(inspectionId);
        if (!checkPermission(req.user, inspection.area)) {
            inspection = {};
        }
        res.status(200).json({
            status: 'success',
            type: 'object',
            message: 'Lấy dữ liệu thành công',
            data: { inspection },
        });
    } catch (error) {
        next(error);
    }
};

// [PUT] CẬP NHẬT THÔNG TIN THANH TRA (THEO ID)
exports.updateInspection = async (req, res, next) => {
    try {
        const { inspectionId } = req.params;
        const document = dataFilter(req.body, {
            status: 'object',
            tasks: 'object',
        });
        let inspection = await Inspection.findById(inspectionId);
        if (checkPermission(req.user, inspection.area)) {
            inspection = await Inspection.findByIdAndUpdate(
                inspectionId,
                document
            );
            res.status(200).json({
                status: 'success',
                type: 'object',
                message: 'Cập nhật thông tin thanh tra thành công',
                data: { inspection },
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

// // [PATCH] CẬP NHẬT GIẤY CHỨNG NHẬN (THEO ID)
// exports.updateLicense = async (req, res, next) => {
//     try {
//         const { facilityId } = req.params;
//         const document = dataFilter(req.body, {
//             business: 'string',
//             issueDate: 'date',
//             expireDate: 'date',
//             isActive: 'boolean',
//         });
//         const filter = 'license';
//         let facility = await Facility.findById(facilityId);
//         if (checkPermission(req.user, facility.area)) {
//             facility = await Facility.findByIdAndUpdate(
//                 facilityId,
//                 { license: document },
//                 {
//                     new: true,
//                     runValidators: true,
//                 }
//             ).select(filter);
//             res.status(200).json({
//                 status: 'success',
//                 type: 'object',
//                 message: 'Cập nhật giấy chứng nhận thành công',
//                 data: { facility },
//             });
//         }
//     } catch (error) {
//         next(error);
//     }
// };

// // [DELETE] XÓA THÔNG TIN CƠ SỞ (THEO ID)
// exports.deleteFacility = async (req, res, next) => {
//     try {
//         const { facilityId } = req.params;
//         let facility = await Facility.findById(facilityId);
//         if (checkPermission(req.user, facility.area)) {
//             await Facility.findByIdAndDelete(facilityId);
//             res.status(200).json({
//                 status: 'success',
//                 type: 'message',
//                 message: 'Xóa dữ liệu cơ sở thành công',
//                 data: null,
//             });
//         } else {
//             res.status(200).json({
//                 status: 'success',
//                 type: 'message',
//                 message: 'Không có đủ quyền để xóa đối tượng này',
//                 data: null,
//             });
//         }
//     } catch (error) {
//         next(error);
//     }
// };
