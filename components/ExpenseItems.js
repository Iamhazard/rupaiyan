"use client";
import React, { useEffect } from "react";
import { IoAddCircle } from "react-icons/io5";
import currencyUtils from "@/utils/currencyUtils";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { fetchExpenses } from "@/Redux/Features/expenseSlice";
import Link from "next/link";

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

  const expenses = useSelector((state) => state.expense.expenses);

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      try {
        dispatch(fetchExpenses());
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    } else {
      // Redirect to login page
    }
  }, [dispatch, session]);

  return (
    <section className="py-4">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-xl">
        <div className="relative flex flex-1 flex-col xl:flex-row">
          <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
            <h2 className="text-2xl font-bold mb-4">My Expenses</h2>
            {session?.user ? (
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
                            {formatDate(expense.createdAt)}
                          </small>
                        </div>
                      </div>

                      <small className="text-yellow-200">
                        {currencyUtils(expense.amount)}
                      </small>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="p-8 h-15 border w-15 shadow-lg rounded-md bg-white gap-3">
                <div className="text-center">
                  <div className="mt-2 px-7 py-3">
                    <p className="text-lg text-gray-500">
                      <Link className="text-blue-300  " href="/login">
                        Login
                      </Link>
                      <span> to see Expenses</span>
                    </p>
                  </div>
                  <div className="flex justify-center mt-4"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpenseItems;
