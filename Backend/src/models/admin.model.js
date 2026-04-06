import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true,
    },
    enrollment: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 10
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    mobile: {
        type: String,
        unique: true,
        required: true,

    },
    department: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
    },
    role: {
        type: String,
        default: "admin"

    },


}, { timestamps: true });


const adminModel = mongoose.model("admin", adminSchema);


export default adminModel;