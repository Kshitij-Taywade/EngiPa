import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true,
    },
    clg_ID: {
        type: Number,
        unique: true,
        required: true,
        minlength: 11
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
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    },
    mobile: {
        type: String,
        unique: true,
        required: true,
        match: /^\d{10}$/
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