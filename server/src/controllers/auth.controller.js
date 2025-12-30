import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import { generateToken } from "../utils/jwt.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { isValidEmail, isStrongPassword } from "../utils/validators.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!isValidEmail(email))
    return errorResponse(res, 400, "Invalid email format");

  if (!isStrongPassword(password))
    return errorResponse(res, 400, "Password must be at least 6 characters");

  const exists = await User.findOne({ email });
  if (exists)
    return errorResponse(res, 400, "Email already registered");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword
  });

  const token = generateToken(user._id);

  return successResponse(res, 201, "User registered successfully", {
    token,
    user
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return errorResponse(res, 401, "Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return errorResponse(res, 401, "Invalid credentials");

  user.lastLogin = new Date();
  await user.save();

  const token = generateToken(user._id);

  return successResponse(res, 200, "Login successful", {
    token,
    user
  });
};

export const currentUser = async (req, res) => {
  return successResponse(res, 200, "Current user fetched", req.user);
};
