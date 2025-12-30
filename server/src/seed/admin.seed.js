import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.model.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    // DB connect
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected for seeding");

    const adminEmail = "admin@test.com";

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
      fullName: "System Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      status: "active"
    });

    console.log("Admin user created successfully");
    console.log("Email: admin@test.com");
    console.log("Password: Admin@123");

    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedAdmin();
