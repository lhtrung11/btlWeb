const Area = require('../models/Area');

exports.areas = async (req, res, next) => {
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
