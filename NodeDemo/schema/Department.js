// departmentModel.js
const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: String,
});

// Lấy tất cả các phòng ban
departmentSchema.statics.getAll = async function () {
    return this.find({});
};

// Lấy phòng ban theo ID
departmentSchema.statics.getById = async function (departmentId) {
    return this.findById(departmentId);
};

// Tạo một phòng ban mới
departmentSchema.statics.createDepartment = async function (name) {
    const newDepartment = new this({ name });
    return newDepartment.save();
};

// Cập nhật phòng ban theo ID
departmentSchema.statics.updateDepartment = async function (departmentId, newName) {
    return this.findByIdAndUpdate(departmentId, { name: newName }, { new: true });
};

// Xóa phòng ban theo ID
departmentSchema.statics.deleteDepartment = async function (departmentId) {
    return this.findByIdAndDelete(departmentId);
};

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
