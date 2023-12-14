import Income from "@/models/income";

//get a single
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const incomes = await Income.findById(params.id).populate("creator");
    if (!incomes) return new Response("Expenses Not Found", { status: 404 });

    return new Response(JSON.stringify(incomes), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
