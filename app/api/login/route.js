import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
const { connectToDB } = require("@/utils/database");

export async function POST(req) {
  try {
    const { emailOrUsername, password } = req.json();

    // Determine if the provided input is an email or username
    const isEmail = emailOrUsername.includes("@");
    await connectToDB();
    console.log(`Connected to db ${process.env.MONGO_URI}`);
    if (!username || !email || !password) {
      return NextResponse.json("please add email and password");
    }
    // Use the correct field for authentication
    const authenticationField = isEmail
      ? { email: emailOrUsername }
      : { username: emailOrUsername };
    const userExists = await User.findOne(authenticationField).select(
      "_id password"
    );

    if (!userExists || !(await bcrypt.compare(password, userExists.password))) {
      return NextResponse.json("Invalid email/username or password", {
        status: 401,
      });
    }

    return NextResponse.json({ message: "User login." }, { status: 201 });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "An error occurred while login the user." },
      { status: 500 }
    );
  }
}
