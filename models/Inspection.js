const mongoose = require("mongoose");

const inspectionSchema = new mongoose.Schema({
    area: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Area",
    },
    facility: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Facility",
    },
    from: {
        type: Date,
        required: [true, "Ngày bắt đầu chưa được đặt"],
    },
    to: {
        type: Date,
        required: [true, "Ngày kết thúc chưa được đặt"],
    },
    status: {
        type: {
            isComplete: Boolean,
            isQualified: Boolean,
        },
    },
    tasks: {
        type: {
            visitFacility: Boolean,
            assessment: {
                collection: Number,
                unitTesting: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Area",
                },
                date: Date,
                result: Boolean,
            },
        },
    },
});

const Inspection = mongoose.model("Inspection", inspectionSchema);

module.exports = Inspection;
