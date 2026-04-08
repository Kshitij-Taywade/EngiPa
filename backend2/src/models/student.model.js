import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true,
    },
    enrollment: {
        type: String,
        unique: true,
        required: true,
        match: /^[a-zA-Z0-9]+$/
    },

    password: {
        type: String,
        required: true,

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
        default: "user"
    },


}, { timestamps: true });


const studentModel = mongoose.model("user", userSchema);


export default studentModel;