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

export const PATCH = async (req, { params }) => {
  const { name, amount, category, notes } = await req.json();

  try {
    await connectToDB();

    // Find the existing expemses by ID
    const existingIncome = await Expense.findById(params.id);

    if (!existingIncome) {
      return new Response("income not found", { status: 404 });
    }

    // Update the expenses with new data
    existingIncome.name = name;
    existingIncome.amount = amount;
    existingIncome.category = category;
    existingIncome.notes = notes;

    await existingIncome.save();

    return new Response("Successfully updated the Expenses", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Expenses", { status: 500 });
  }
};

//delete
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    if (!params.id || params.id.trim() === "") {
      return new Response("Invalid Expense ID", { status: 400 });
    }

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
