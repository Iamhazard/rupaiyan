"use client";
import currencyUtils from "@/utils/currencyUtils";

import { useRouter } from "next/navigation";

const Card = () => {
  const router = useRouter();

  const handleIncomeClick = (e) => {
    e.preventDefault();
    console.log("Clicked Income");
    router.push("/form?type=income");
  };

  const handleExpenseClick = (e) => {
    e.preventDefault();
    console.log("Clicked Expense");
    router.push("/form?type=expense");
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* Income card */}
      <div className="bg-white border border-black p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">Income</h2>
        <span>{currencyUtils(2000)}</span>

        <button
          onClick={handleIncomeClick}
          type="button"
          className="btn btn-primary">
          + Income
        </button>
      </div>

      {/* Expense Card */}
      <div className="bg-white border border-black p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">Expense</h2>
        <span>{currencyUtils(3000)}</span>

        <button
          name="expense-btn"
          type="button"
          onClick={handleExpenseClick}
          className="btn primary-outline">
          + Expenses
        </button>
      </div>
    </div>
  );
};

export default Card;
