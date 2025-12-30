import User from "../models/User.model.js";
import { successResponse } from "../utils/response.js";

export const getAllUsers = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const users = await User.find()
    .skip(skip)
    .limit(limit)
    .select("-password");

  const total = await User.countDocuments();

  return successResponse(res, 200, "Users fetched", {
    users,
    total,
    page
  });
};

export const updateStatus = async (req, res) => {
  const { userId } = req.params;
  const { status } = req.body;

  await User.findByIdAndUpdate(userId, { status });

  return successResponse(res, 200, "User status updated");
};
