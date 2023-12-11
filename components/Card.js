"use client";
import currencyUtils from "@/utils/currencyUtils";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { useRouter } from "next/navigation";

const Card = () => {
  const router = useRouter();

  const handleIncomeClick = (e) => {
    e.preventDefault();
    console.log("Clicked Income");
    router.push("/form?type=Income");
  };

  const handleExpenseClick = (e) => {
    e.preventDefault();
    console.log("Clicked Expense");
    router.push("/form?type=Expense");
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {/* Income card */}
      <div className="bg-white border border-black p-4 gap-2 rounded-4xl shadow-md">
        <h2 className="text-xl font-bold flex items-center">
          <AiOutlineSortAscending size={30} className="mr-2" /> Income
        </h2>
        <span>{currencyUtils(2000)}</span>

        <button
          onClick={handleIncomeClick}
          type="button"
          className="btn btn-primary mt-2 text-lg">
          {" "}
          {/* Increased button size and added margin top */}+ Income
        </button>
      </div>

      {/* Expense Card */}
      <div className="bg-white border border-black p-4 gap-2 rounded-4xl shadow-md">
        {" "}
        {/* Added gap between cards */}
        <h2 className="text-xl font-bold flex items-center">
          <AiOutlineSortDescending size={30} className="mr-2" /> Expense
        </h2>
        <span>{currencyUtils(3000)}</span>
        <br />
        <button
          name="expense-btn"
          type="button"
          onClick={handleExpenseClick}
          className="btn primary-outline mt-2 text-lg">
          {" "}
          {/* Increased button size and added margin top */}+ Expenses
        </button>
      </div>
    </div>
  );
};

export default Card;
