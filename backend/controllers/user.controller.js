import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {

    try {
        const { fullName, email, phoneNumber, password, role } = req.body;
        

        if (!fullName || !email || !password || !role || !phoneNumber) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        });

        return res.status(200).json({
            message: "User registered successfully",
            success: true
        });

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const login = async (req, res) => {

    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        let user = await User.findOne({email});
        

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }


        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }

        if (role !== user.role) {
            return res.status(401).json({
                message: "Account doesn't exist",
                success: false
            });
        }

        const tokenData = {
            id: user._id,
            role:user.role,
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            id: user._id,
            fullName:user.fullName,
            password: user.password,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullName}`,
            user,
            success: true,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Login user failed",
            success: false
        });
    }
}

export const logout = async (req, res) => {

    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logout Successfull",
            success: true,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Logout failed",
            success: false
        });
    }
}

export const updateProfile = async (req, res) => {

    try {

        const { fullName, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }

        //from authenticated route
        const userId = req.user.id;
    
        let user = await User.findById(userId);
       

        if (!user) {
            return res.status(400).json({
                message: "User does't exist",
                success: false,
            })
        }

        if (fullName) user.fullName = fullName;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skills;

        await user.save();

        user = {
            id: user._id,
            fullName:user.fullName,
            password: user.password,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        }


        return res.status(200).json({
            message:"Profile updated successfull",
            user,
            success:true,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Update Profile failed",
            success: false,
        })

    }

}