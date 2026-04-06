import express from "express"
import paperModel from "../models/paper.model.js"
import userModel from "../models/user.model.js"
import adminModel from "../models/admin.model.js"
import jwt from "jsonwebtoken"
import authenticateToken from "../auth/user.auth.js"
import uploadFile from "../services/storage.services.js"
import multer from "multer"

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() })

router.post(
    "/upload-paper",
    authenticateToken,
    upload.single("file"),
    async(req, res) => {
        try {
            // check user is admin or not
            const userId = req.user.id; // comes from JWT
            const admin = await adminModel.findById(userId);

            if (!admin) {
                return res.status(403).json({
                    message: "Access denied. Only admins can upload papers.",
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    message: "No file uploaded",
                });
            }

            // Upload to ImageKit
            const result = await uploadFile(req.file.buffer);

            // Save to MongoDB
            const paper = await paperModel.create({
                file: result.url, // ✅ store ImageKit URL here
                subject: req.body.subject,
                semester: req.body.semester,
                year: req.body.year,
                paper_type: req.body.paper_type,
                department: req.body.department,
            });


            return res.status(201).json({
                message: "Paper uploaded successfully",
                paper,
            });
        } catch (e) {
            console.error("Error in /upload-paper:", e);
            return res.status(500).json({
                message: "Error from Backend side",
            });
        }
    }
);

// update the paper

// router.patch("/update-paper", authenticateToken, upload.single("pdf"), async(req, res) => {
//     try {
//         // check user is admin or not 

//         const { id } = req.headers;
//         const userId = await userModel.findById(id)

//         if (userId.role !== "admin") {
//             return res.status(400).json({
//                 message: "You don't have access to update the papers"
//             })

//         } else {
//             const { paperId } = req.headers;


//             const paper = await paperModel.findByIdAndUpdate(paperId, {
//                 pdf: await uploadFile(req.file.buffer),
//                 subject: req.body.subject,
//                 semister: req.body.semister,
//                 year: req.body.year,
//                 paper_type: req.body.paper_type,

//             })
//             return res.status(201).json({
//                 message: "Paper updated succesfully",
//                 paper
//             })
//         }


//     } catch (e) {
//         console.log(e);
//         return res.status(500).json({
//             message: "Error from Backend side"
//         })
//     }

// })
router.get("/get-paper", async(req, res) => {
    try {
        const { department, year, semester, subject, paper_type } = req.query;

        // Build query dynamically
        const query = {};
        if (department) query.department = department;
        if (year) query.year = Number(year);
        if (semester) query.semester = Number(semester);
        if (subject) query.subject = subject;
        if (paper_type) query.paper_type = paper_type;

        const papers = await paperModel.find(query);

        res.json({ posts: papers });
    } catch (err) {
        console.error("Error fetching papers:", err);
        res.status(500).json({ error: "Server error" });
    }
});
export default router;