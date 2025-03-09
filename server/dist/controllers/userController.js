"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDetails = exports.logout = exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    try {
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists!" });
            return;
        }
        if (!usernameRegex.test(username)) {
            res.status(400).json({ message: "Some characters are not allowed!" });
            return;
        }
        const user = await User_1.User.create({
            email,
            password, // ✅ No hashing, as per request
            username,
        });
        const jwtToken = jsonwebtoken_1.default.sign({ _id: user._id, email: user.email }, process.env.JWT_KEY, { expiresIn: "1d" });
        res.cookie("token", jwtToken, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
            sameSite: "lax",
        });
        res.status(201).json({
            username: user.username,
            picture: user.picture,
            email: user.email,
            savedCodes: user.savedCodes,
            isAdmin: user.isAdmin,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error signing up!", error });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    const { userId, password } = req.body;
    try {
        const existingUser = await User_1.User.findOne(userId.includes("@") ? { email: userId } : { username: userId });
        if (!existingUser) {
            res.status(400).json({ message: "User not found" });
            return;
        }
        if (password !== existingUser.password) {
            res.status(400).json({ message: "Wrong password" });
            return;
        }
        const jwtToken = jsonwebtoken_1.default.sign({ _id: existingUser._id, email: existingUser.email }, process.env.JWT_KEY, { expiresIn: "1d" });
        res.cookie("token", jwtToken, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            httpOnly: true,
            sameSite: "lax",
        });
        res.status(200).json({
            username: existingUser.username,
            picture: existingUser.picture,
            email: existingUser.email,
            savedCodes: existingUser.savedCodes,
            isAdmin: existingUser.isAdmin,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error logging in!", error });
    }
};
exports.login = login;
const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logged out successfully!" });
    }
    catch (error) {
        res.status(500).json({ message: "Error logging out!", error });
    }
};
exports.logout = logout;
const userDetails = async (req, res) => {
    const userId = req._id;
    try {
        const user = await User_1.User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "Cannot find the user!" });
            return;
        }
        res.status(200).json({
            username: user.username,
            picture: user.picture,
            email: user.email,
            savedCodes: user.savedCodes,
            isAdmin: user.isAdmin,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Cannot fetch user details" });
    }
};
exports.userDetails = userDetails;
