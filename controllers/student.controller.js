const Student = require("../models/Student");

exports.getAllStudent = async (req, res, next) => {
    try {
        const students = await Student.find();
        res.status(200).json({
            result: students.length,
            data: { students },
        });
    } catch (error) {
        next(error);
    }
};

exports.getStudent = async (req, res, next) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findById(studentId);
        if (student === null) {
            const err = new Error("Không tìm thấy id tương ứng");
            err.statusCode = 404;
            next(err);
        } else {
            res.status(200).json({
                data: { student },
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.updateStudent = async (req, res, next) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findByIdAndUpdate(
            studentId,
            {
                ...req.body,
            },
            { new: true, runValidators: true }
        );
        if (student === null) {
            const err = new Error("Không tìm thấy id tương ứng");
            err.statusCode = 404;
            next(err);
        } else {
            res.status(200).json({
                data: { student },
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.createStudent = async (req, res, next) => {
    try {
        const { studentId } = req.params;
        const student = await Student.create({
            ...req.body,
            _id: studentId,
        });
        res.status(200).json({
            data: { student },
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteStudent = async (req, res, next) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findByIdAndDelete(studentId);
        if (student === null) {
            const err = new Error("Không tìm thấy id tương ứng");
            err.statusCode = 404;
            next(err);
        } else {
            res.status(200).json({
                data: { message: "Xóa thành công" },
            });
        }
    } catch (error) {
        next(error);
    }
};
