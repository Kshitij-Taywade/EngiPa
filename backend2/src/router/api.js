import express from "express";
import studentModel from "../models/student.model.js";
import adminModel from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authenticateToken from "../auth/authentication.js";

const router = express.Router();

// REGISTER USER
router.post("/register", async(req, res) => {
    try {
        const { fullName, enrollment, password, email, mobile, department } = req.body;

        // validations...

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const newUser = new userModel({
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
        if (e.code === 11000) {
            const field = Object.keys(e.keyValue)[0];
            return res.status(400).json({ message: `${field} already exists` });
        }
        console.error(e);
        res.status(500).json({ message: "Error from backend side" });
    }
});

// LOGIN
router.post("/login", async(req, res) => {
    try {
        const { role, clg_ID, enrollment, password } = req.body;

        // ADMIN LOGIN
        if (role === "admin") {
            const adminUser = await adminModel.findOne({ clg_ID });
            if (!adminUser) {
                return res.status(400).json({ message: "Invalid admin ID" });
            }

            const isMatch = await bcrypt.compare(password, adminUser.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign({ id: adminUser._id, role: adminUser.role },
                "paperStore123", { expiresIn: "30d" }
            );
            return res.status(200).json({ id: adminUser._id, role: adminUser.role, token });
        }

        // USER LOGIN
        const existUser = await studentModel.findOne({ enrollment });
        if (!existUser) {
            return res.status(400).json({ message: "Invalid enrollment number" });
        }

        const isMatch = await bcrypt.compare(password, existUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: existUser._id, role: existUser.role },
            "paperStore123", { expiresIn: "30d" }
        );
        return res.status(200).json({ id: existUser._id, role: existUser.role, token });

    } catch (e) {
        if (e.code === 11000) {
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