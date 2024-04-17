import mongoose from "mongoose";

const AdminUserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }
});

const AdminUser = mongoose.model('AdminUser', AdminUserSchema);

export default AdminUser;