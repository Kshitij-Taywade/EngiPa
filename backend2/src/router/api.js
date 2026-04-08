import express from "express";
import studentModel from "../models/student.model.js";
import adminModel from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authenticateToken from "../auth/authentication.js";

const router = express.Router();

// REGISTER student
router.post("/register", async(req, res) => {
    try {
        const { fullName, enrollment, password, email, mobile, department } = req.body;

        // hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new studentModel({
            fullName,
            enrollment,
            password: hashedPassword, // always hashed here
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

// REGISTER admin
router.post("/AdminRegister", async(req, res) => {
    try {
        const { fullName, clg_ID, password, email, mobile, department } = req.body;


        //check enrollment is valid or not 
        clg_ID = Number(req.body.clg_ID);
        if (!clg_ID || clg_ID.toString().length < 11) {
            return res.status(400).json({ message: "clg_ID must be at least 11 digits" });
        }

        clg_ID = Number(req.body.clg_ID);
        // check admin exist or not 

        // 1...  Check by using enrollement
        const adminclg_ID = await adminModel.findOne({ clg_ID: clg_ID });

        if (adminclg_ID) {
            return res.status(400).json({
                message: "clg_ID already exists"
            })
        }

        // 2...check by using email

        const adminEmail = await adminModel.findOne({ email: email });
        if (adminEmail) {
            return res.status(400).json({
                message: "Email already exists"
            })
        }

        // check mobile number 
        const adminMobile = await adminModel.findOne({ mobile: mobile });
        if (adminMobile) {
            return res.status(400).json({
                message: "Mobile number already exists"
            })
        }


        // hashing the password

        const hashing = await bcrypt.hash(password, 10)
            // Creating new User 
        const newUser = new adminModel({
            fullName: fullName,
            clg_ID: clg_ID,
            password: hashing,
            email: email,
            mobile: mobile,
            department: department,
            role: "admin"
        });
        await newUser.save();
        return res.status(200).json({
            message: "new admin created succesfully"
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "error from backend side"
        })
    }
})

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