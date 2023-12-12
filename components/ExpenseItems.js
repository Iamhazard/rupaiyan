"use client";
import React, { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import currencyUtils from "@/utils/currencyUtils";
import { useDispatch, useSelector } from "react-redux";
// import { fetchExpenses } from "@/Redux/Features/expenseSlice";
// import { selectIsLoggedIn } from "@/Redux/Features/authSlice";
import { useSession } from "next-auth/react";
import { fetchExpenses } from "@/Redux/Features/expenseSlice";

const formatDate = (dateString) => {
  const inputDate = new Date(dateString);
  return inputDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const ExpenseItems = () => {
  const dispatch = useDispatch();
  //const isLoggedIn = useSelector(selectIsLoggedIn);
  const expenses = useSelector((state) => state.expense.expenses);

  console.log("Expenses from Redux store:", expenses);
  const [allexpenses, setAllExpenses] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    try {
      dispatch(fetchExpenses());
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  }, [dispatch]);

  return (
    <section className="py-4">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-xl">
        <div className="relative flex flex-1 flex-col xl:flex-row">
          <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
            <h2 className="text-2xl font-bold mb-4">My Expenses</h2>
            <div className="flex flex-col gap-4 mt-1">
              {expenses &&
                expenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl mb-4 xl:mb-0">
                    <div className="flex items-center gap-2">
                      <div>
                        <IoAddCircle className="text-white" size={25} />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="capitalize text-white">
                          {expense.name}
                        </h4>
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
