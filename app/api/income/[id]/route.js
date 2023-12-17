import Expense from "@/models/expense";
import { connectToDB } from "@/utils/database";

//get
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const expense = await Expense.findById(params.id).populate("creator");
    if (!expense) return new Response("Expenses Not Found", { status: 404 });

    return new Response(JSON.stringify(expense), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

//patch

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    // Find the existing prompt by ID
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    // Update the prompt with new data
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response("Successfully updated the Prompts", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Prompt", { status: 500 });
  }
};

//delete
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    const deletedexpense = await Expense.findOneAndDelete({ _id: params.id });

    if (!deletedexpense) {
      return new Response("Expense not found", { status: 404 });
    }
    return new Response("Expense deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting Expense:", error);
    return new Response("Error deleting Expense", { status: 500 });
  }
};
