import Income from "@/models/income";
import { connectToDB } from "@/utils/database";

export const POST = async (req, res) => {
  const { userId, name, amount, category, notes } = await req.json();

  try {
    await connectToDB();
    const newIncome = new Income({
      creator: userId,
      name,
      amount,
      category,
      notes,
    });
    await newIncome.save();
    return new Response(JSON.stringify(newIncome), { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/income/new:", error);
    return new Response(JSON.stringify("failed to create income"), {
      status: 500,
    });
  }
};
