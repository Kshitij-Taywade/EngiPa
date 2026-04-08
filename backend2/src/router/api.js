import express from "express";
import studentModel from "../models/student.model.js";
import adminModel from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import authenticateToken from "../auth/user.auth.js";

const router = express.Router();

// REGISTER USER
router.post("/register", async(req, res) => {
    try {
        const { fullName, enrollment, password, email, mobile, department } = req.body;

        // validations
        if (fullName.length < 10) {
            return res.status(400).json({ message: "Full name must be at least 10 characters" });
        }
        if (enrollment.length < 10) {
            return res.status(400).json({ message: "Enrollment number must be at least 10 characters" });
        }
        if (!mobile || mobile.length !== 10) {
            return res.status(400).json({ message: "Mobile number must be exactly 10 digits" });
        }

        if (password.length < 5) {
            return res.status(400).json({ message: "Password must be at least 5 characters" });
        }
        // uniqueness checks
        if (await studentModel.findOne({ enrollment })) {
            return res.status(400).json({ message: "Enrollment already exists" });
        }
        if (await studentModel.findOne({ email })) {
            return res.status(400).json({ message: "Email already exists" });
        }
        if (await studentModel.findOne({ mobile })) {
            return res.status(400).json({ message: "Mobile number already exists" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const newUser = new studentModel({
            fullName,
            enrollment,
            password: hashedPassword,
            email,
            mobile,
            department,
            role: "user"
        });

        await newUser.save();

        return res.status(201).json({ message: "New user created successfully" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error from backend side" });
    }
});

// LOGIN
router.post("/login", async(req, res) => {
    try {
        const { enrollment, password } = req.body;


        const existUser = await studentModel.findOne({
            enrollment
        });
        const adminUser = await adminModel.findOne({ enrollment });

        if (!existUser && !adminUser) {
            return res.status(400).json({ message: "Invalid enrollment number" });
        }

        // ADMIN LOGIN
        if (adminUser) {
            const isMatch = await bcrypt.compare(password, adminUser.password);
            if (isMatch) {
                const token = jwt.sign({ id: adminUser._id, role: adminUser.role },
                    "paperStore123", { expiresIn: "30d" }
                );
                return res.status(200).json({ id: adminUser._id, role: adminUser.role, token });
            }
        }

        // USER LOGIN
        if (existUser) {
            const isMatch = await bcrypt.compare(password, existUser.password);
            if (isMatch) {
                const token = jwt.sign({ id: existUser._id, role: existUser.role },
                    "paperStore123", { expiresIn: "30d" }
                );
                return res.status(200).json({ id: existUser._id, role: existUser.role, token });
            }
        }

        return res.status(400).json({ message: "Invalid credentials" });
    } catch (e) {
        if (e.code === 11000) {
            // Which field caused the duplicate
            const field = Object.keys(e.keyValue)[0];
            return res.status(400).json({ message: `${field} already exists` });
        }
        console.error(e);
        return res.status(500).json({ message: "Error from backend side" });
    }

});

// GET USER INFO
router.get("/get", authenticateToken, async(req, res) => {
    try {
        // use id from decoded token, not headers
        const data = await studentModel.findById(req.user.id).select("-password");
        if (!data) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(data);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Error from backend" });
    }
});

export default router;