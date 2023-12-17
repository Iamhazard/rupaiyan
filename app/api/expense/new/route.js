import Expense from "@/models/expense";
import { connectToDB } from "@/utils/database";

export const POST = async (req, res) => {
  const { userId, name, amount, category, notes } = await req.json();
  try {
    if (!userId || !name || !amount || !category) {
      return new Response(JSON.stringify("Missing required fields"), {
        status: 400,
      });
    }
    await connectToDB();
    const newExpense = new Expense({
      creator: userId,
      name,
      amount,
      category,
      notes,
    });
    await newExpense.save();
    return new Response(JSON.stringify(newExpense), { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/expense/new:", error);
    return new Response(JSON.stringify("failed to create expenses"), {
      status: 500,
    });
  }
};
