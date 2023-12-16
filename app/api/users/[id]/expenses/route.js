import Expense from "@/models/expense";
import { connectToDB } from "@/utils/database";
import mongoose from "mongoose";

export const GET = async (request, { params }) => {
  console.log("Params:", params);
  try {
    await connectToDB();

    const Expenses = await Expense.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify({ Expenses }), {
      status: 200,
    });
  } catch (error) {
    console.error("Failed to fetch all expenses:", error);
    return new Response("Failed to fetch all expenses", { status: 500 });
  }
};
