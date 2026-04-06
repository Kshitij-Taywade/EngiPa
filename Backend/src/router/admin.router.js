import express from "express"

import adminModel from "../models/admin.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import authenticateToken from "../auth/user.auth.js"

const router = express.Router();


// register
router.post("/AdminRegister", async(req, res) => {
    try {
        const { fullName, enrollment, password, email, mobile, department } = req.body;

        //check full name  
        if (fullName.length < 5) {
            return res.status(400).json({
                message: "The size of full name must be 5 or greater character"
            })
        }
        //check enrollment is valid or not 
        if (enrollment.length < 10) {
            return res.status(400).json({
                message: "The size of enrollment number must be 10 or greater"
            })
        }

        // check mobile no length
        if (!mobile || mobile.length !== 10) {
            return res.status(400).json({ message: "Mobile number must be exactly 10 digits" });
        }


        // ckeck password length

        if (password.length < 5) {
            return res.status(400).json({
                message: "Password must be greater than 9"
            })
        }

        // check user exist or not 

        // 1...  Check by using enrollement
        const userEnrollement = await adminModel.findOne({ enrollment: enrollment });

        if (userEnrollement) {
            return res.status(400).json({
                message: "Enrollement already exists"
            })
        }

        // 2...check by using email

        const userEmail = await adminModel.findOne({ email: email });
        if (userEmail) {
            return res.status(400).json({
                message: "Email already exists"
            })
        }

        // check mobile number 
        const userMobile = await adminModel.findOne({ mobile: mobile });
        if (userMobile) {
            return res.status(400).json({
                message: "Mobile number already exists"
            })
        }


        // hashing the password

        const hashing = await bcrypt.hash(password, 10)
            // Creating new User 
        const newUser = new adminModel({
            fullName: fullName,
            enrollment: enrollment,
            password: hashing,
            email: email,
            mobile: mobile,
            department: department,
            role: "admin"



        });
        await newUser.save();
        return res.status(200).json({
            message: "new user created succesfully"
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "error from backend side"
        })
    }
})


// to get user information

router.get("/get", authenticateToken, async(req, res) => {
    try {
        const { id } = req.headers;
        const data = await adminModel.findById(id).select("-password");
        return res.status(200).json(data);


    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Error from Backend " })
    }

})

export default router;