//adding income and expenses

import Income from "@/models/income";
import { NextResponse } from "next/server";

export default async function handler(req, res) {
  const { name, category, amount, notes, incomedate } = req.body;

  //validation

  if (!name || !category || !amount || !notes || !incomedate) {
    return NextResponse.json("Please fill all field", {
      status: 400,
    });
  }

  //creatinng

  const income = await Income.create({
    user: req.user.id,
    name,
    category,
    amount,
    notes,
    incomedate: new Date(incomedate),
  });
  return NextResponse.json(income, {
    status: 200,
  });
}
