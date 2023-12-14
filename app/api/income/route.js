//for fetch
import Income from "@/models/income";
import { connectToDB } from "@/utils/database";

export const GET = async (req) => {
  try {
    if (process.env.NODE_ENV === "production") await connectToDB();

    const income = await Income.find({}).populate("creator");

    return new Response(JSON.stringify(income), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all incomes", { status: 500 });
  }
};
