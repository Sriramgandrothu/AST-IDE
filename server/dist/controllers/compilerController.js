"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCodes = exports.editCode = exports.deleteCode = exports.getMyCodes = exports.loadCode = exports.saveCode = void 0;
const Code_1 = require("../models/Code");
const User_1 = require("../models/User");
const saveCode = async (req, res) => {
    const { fullCode, title } = req.body;
    let ownerName = "Anonymous";
    let ownerInfo = undefined;
    let isAuthenticated = false;
    if (req._id) {
        const user = await User_1.User.findById(req._id);
        if (!user) {
            res.status(404).send({ message: "User not found!" });
            return;
        }
        ownerName = user.username;
        ownerInfo = user._id;
        isAuthenticated = true;
    }
    if (!fullCode.html && !fullCode.css && !fullCode.javascript) {
        res.status(400).send({ message: "Code cannot be blank!" });
        return;
    }
    try {
        const newCode = await Code_1.Code.create({ fullCode, ownerName, ownerInfo, title });
        if (isAuthenticated && ownerInfo) {
            await User_1.User.findByIdAndUpdate(ownerInfo, { $push: { savedCodes: newCode._id } });
        }
        res.status(201).send({ url: newCode._id, status: "saved!" });
    }
    catch (error) {
        res.status(500).send({ message: "Error saving code", error });
    }
};
exports.saveCode = saveCode;
const loadCode = async (req, res) => {
    const { urlId } = req.body;
    try {
        const existingCode = await Code_1.Code.findById(urlId);
        if (!existingCode) {
            res.status(404).send({ message: "Code not found" });
            return;
        }
        const user = await User_1.User.findById(req._id);
        const isOwner = user?.username === existingCode.ownerName;
        res.status(200).send({ fullCode: existingCode.fullCode, isOwner });
    }
    catch (error) {
        res.status(500).send({ message: "Error loading code", error });
    }
};
exports.loadCode = loadCode;
const getMyCodes = async (req, res) => {
    try {
        const user = await User_1.User.findById(req._id).populate({ path: "savedCodes", options: { sort: { createdAt: -1 } } });
        if (!user) {
            res.status(404).send({ message: "Cannot find User!" });
            return;
        }
        res.status(200).send(user.savedCodes);
    }
    catch (error) {
        res.status(500).send({ message: "Error loading my codes!", error });
    }
};
exports.getMyCodes = getMyCodes;
const deleteCode = async (req, res) => {
    try {
        const { id } = req.params;
        const owner = await User_1.User.findById(req._id);
        if (!owner) {
            res.status(404).send({ message: "Cannot find the owner profile!" });
            return;
        }
        const existingCode = await Code_1.Code.findById(id);
        if (!existingCode) {
            res.status(404).send({ message: "Code not found" });
            return;
        }
        if (existingCode.ownerName !== owner.username) {
            res.status(403).send({ message: "You don't have permission to delete this code!" });
            return;
        }
        await Code_1.Code.findByIdAndDelete(id);
        res.status(200).send({ message: "Code Deleted successfully!" });
    }
    catch (error) {
        res.status(500).send({ message: "Error deleting code!", error });
    }
};
exports.deleteCode = deleteCode;
const editCode = async (req, res) => {
    try {
        const { id } = req.params;
        const fullCode = req.body;
        const owner = await User_1.User.findById(req._id);
        if (!owner) {
            res.status(404).send({ message: "Cannot find owner!" });
            return;
        }
        const existingPost = await Code_1.Code.findById(id);
        if (!existingPost) {
            res.status(404).send({ message: "Cannot find post to edit!" });
            return;
        }
        if (existingPost.ownerName !== owner.username) {
            res.status(403).send({ message: "You don't have permission to edit this post!" });
            return;
        }
        await Code_1.Code.findByIdAndUpdate(id, { fullCode });
        res.status(200).send({ message: "Post updated successfully" });
    }
    catch (error) {
        res.status(500).send({ message: "Error editing code!", error });
    }
};
exports.editCode = editCode;
const getAllCodes = async (_req, res) => {
    try {
        const allCodes = await Code_1.Code.find().sort({ createdAt: -1 });
        res.status(200).send(allCodes);
    }
    catch (error) {
        res.status(500).send({ message: "Error fetching codes!", error });
    }
};
exports.getAllCodes = getAllCodes;
