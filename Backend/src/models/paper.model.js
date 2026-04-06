import mongoose from "mongoose";

const paperSchema = new mongoose.Schema({
    file: { type: String, required: true, unique: true },
    subject: { type: String, required: true },
    semester: { type: Number, required: true }, // number
    year: { type: Number, required: true }, // number
    paper_type: { type: String, required: true }, // string
    department: { type: String, required: true } // string
}, { timestamps: true });

const Paper = mongoose.model("Paper", paperSchema);
export default Paper;