import Expense from "@/models/expense";

//get
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const expenes = await Expense.findById(params.id).populate("creator");
    if (!expenes) return new Response("Expenses Not Found", { status: 404 });

    return new Response(JSON.stringify(expenes), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
