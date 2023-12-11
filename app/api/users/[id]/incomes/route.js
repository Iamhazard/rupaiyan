import Income from "@models/income";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const Incomes = await Income.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(Incomes), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all incomes", { status: 500 });
  }
};
