//for fetch

import Expense from "@/models/expense";
import { connectToDB } from "@/utils/database";

export const GET = async (req) => {
  try {
    if (process.env.NODE_ENV === "production") await connectToDB();

    const expense = await Expense.find({}).populate("creator");

    return new Response(JSON.stringify(expense), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all expenses", { status: 500 });
  }
};
