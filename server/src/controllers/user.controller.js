import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const getProfile = async (req, res) => {
  return successResponse(res, 200, "User profile fetched", req.user);
};

export const updateProfile = async (req, res) => {
  const { fullName, email } = req.body;

  const user = await User.findById(req.user._id);

  if (!user)
    return errorResponse(res, 404, "User not found");

  if (email) user.email = email;
  if (fullName) user.fullName = fullName;

  await user.save();

  return successResponse(res, 200, "Profile updated", user);
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch)
    return errorResponse(res, 400, "Old password is incorrect");

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return successResponse(res, 200, "Password changed successfully");
};
