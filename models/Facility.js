const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Cơ sở này chưa có tên'],
        default: 'Chưa có',
    },
    area: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Area',
        required: [true, 'Cơ sở này không thuộc về khu vực nào'],
    },
    address: {
        type: String,
        required: [true, 'Thiếu địa chỉ cơ sở'],
    },
    contact: {
        type: String,
        required: [true, 'Số điện thoại chưa có'],
        default: 'Chưa có',
    },
    business: {
        type: String,
        required: [true, 'Loại hình kinh doanh chưa có'],
        default: 'Chưa có',
    },
    license: {
        type: {
            business: String,
            issueDate: Date,
            expireDate: Date,
            isActive: Boolean,
        },
    },
});

const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility;
