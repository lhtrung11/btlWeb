const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Khu vực này chưa có tên"],
    },
    isManaged: {
        type: Boolean,
        default: false,
    },
    managers: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        length: Number,
    },
});

const Area = mongoose.model("Area", areaSchema);

module.exports = Area;
