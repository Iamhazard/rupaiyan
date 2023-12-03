import React from "react";
import { IoAddCircle } from "react-icons/io5";
import currencyUtils from "@/utils/currencyUtils";

const formatDate = (dateString) => {
  const inputDate = new Date(dateString);
  return inputDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
const ExpenseItems = () => {
  const expenses = [
    { id: 1, name: "Expense 1", amount: 5000, date: "December 2, 2023" },
    { id: 2, name: "Expense 2", amount: 3000, date: "December 3, 2023" },
    { id: 3, name: "Expense 3", amount: 3000, date: "December 3, 2023" },
    { id: 4, name: "Expense 4", amount: 3000, date: "December 3, 2023" },
    { id: 5, name: "Expense 5", amount: 3000, date: "December 3, 2023" },
  ];

  return (
    <section className="py-4">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-xl">
        <div className="relative flex flex-1 flex-col xl:flex-row">
          <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
            <h2 className="text-2xl font-bold mb-4">My Expenses</h2>
            <div className="flex flex-col gap-4 mt-1">
              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl mb-4 xl:mb-0">
                  <div className="flex items-center gap-2">
                    <div>
                      <IoAddCircle className="text-white" size={25} />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="capitalize text-white">{expense.name}</h4>
                      <small className="text-xs text-gray-400">
                        {formatDate(expense.date)}
                      </small>
                    </div>
                  </div>

                  <small className="text-yellow-200">
                    {currencyUtils(expense.amount)}
                  </small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpenseItems;
