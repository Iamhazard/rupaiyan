//adding income and expenses

import Income from "@/models/income";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  console.log("Incoming Request Body:", req.body);
  try {
    const { name, category, amount, notes } = await req.body;

    // Validation
    await connectToDB();
    console.log(`Connected to db ${process.env.MONGO_URI}`);
    if (!name || !category || !amount || !notes) {
      return NextResponse.json("Please fill all required field", {
        status: 400,
      });
    }

    // Creating

    const income = await Income.create({
      user: req.user.id,
      name,
      category,
      amount,
      notes,
    });
    res.status(201).json(income);
    return NextResponse.json({ message: "income added." }, { status: 201 });
  } catch (error) {
    console.error("Error creating income:", error);
    return NextResponse.error("Internal Server Error", 500);
  }
}
