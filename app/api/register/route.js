import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
const { connectToDB } = require("@/utils/database");

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    await connectToDB();
    console.log(`Connected to db ${process.env.MONGO_URI}`);
    const userExists = await User.findOne({ email }).select("_id");

    if (userExists) {
      return NextResponse.json("email is already use", { status: 400 });
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //create newUser

    await User.create({
      email,
      password: hashedPassword,
      username,
    });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
