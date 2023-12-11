//for fetch
import Income from "@/models/income";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
  try {
    await connectToDB();

    const incomes = await Income.find({}).populate("creator");

    return new Response(JSON.stringify(incomes), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all incomes", { status: 500 });
  }
};
