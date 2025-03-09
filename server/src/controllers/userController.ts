import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { AuthRequest } from "../middlewares/verifyToken";

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;
  const usernameRegex = /^[a-zA-Z0-9]+$/;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists!" });
      return;
    }
    if (!usernameRegex.test(username)) {
      res.status(400).json({ message: "Some characters are not allowed!" });
      return;
    }

    const user = await User.create({
      email,
      password, // ✅ No hashing, as per request
      username,
    });

    const jwtToken = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_KEY!,
      { expiresIn: "1d" }
    );

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
  } catch (error) {
    res.status(500).json({ message: "Error signing up!", error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { userId, password }: { userId: string; password: string } = req.body;

  try {
    const existingUser = await User.findOne(userId.includes("@") ? { email: userId } : { username: userId });

    if (!existingUser) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    if (password !== existingUser.password) {
      res.status(400).json({ message: "Wrong password" });
      return;
    }

    const jwtToken = jwt.sign(
      { _id: existingUser._id, email: existingUser.email },
      process.env.JWT_KEY!,
      { expiresIn: "1d" }
    );

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
  } catch (error) {
    res.status(500).json({ message: "Error logging in!", error });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out!", error });
  }
};

export const userDetails = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req._id;

  try {
    const user = await User.findById(userId);
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
  } catch (error) {
    res.status(500).json({ message: "Cannot fetch user details" });
  }
};