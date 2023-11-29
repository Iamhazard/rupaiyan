"use client";
import Link from "next/link";
import React from "react";

const Card = ({ name }) => {
  const handleIncomeClick = () => {
    console.log("Clicked Income");
    router.push("/form?type=income");
  };

  const handleExpenseClick = () => {
    console.log("Clicked Expense");
  };
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* Income card */}
      <div className="bg-white border border-black p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">Income</h2>
        <span>Nrs.2000</span>
        <Link href={`/form?type=income`} onClick={handleIncomeClick}>
          <button className="btn btn-primary">+ Income</button>
        </Link>{" "}
      </div>

      {/* Expense Card */}
      <div className="bg-white border border-black p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">Expense</h2>
        <span>Nrs.2000</span>
        <Link href={`/form?type=expense`} onClick={handleExpenseClick}>
          <button className="btn primary-outline">+ Expenses</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
