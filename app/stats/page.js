"use client";
import ExpenseChart from "@/components/ExpenseChart";
import IncomeChart from "@/components/IncomeChart";
import currencyUtils from "@/utils/currencyUtils";
import { IoAddCircle } from "react-icons/io5";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllIncome } from "@/Redux/Features/incomeSlice";
import { useSession } from "next-auth/react";
import { fetchExpenses } from "@/Redux/Features/expenseSlice";
import {
  CHANGE_FILTER,
  selectinitialFilter,
} from "@/Redux/Features/filterSlice";

const Stats = () => {
  const dispatch = useDispatch();
  const incomes = useSelector((state) => state.income.incomes);
  const expenses = useSelector((state) => state.expense.expenses);
  const selectFilter = useSelector(selectinitialFilter);
  const [activeTab, setActiveTab] = useState("expenses");
  const handleTabClick = (tabId) => {
    console.log("Tab clicked:", tabId);
    setActiveTab(tabId);
  };
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      try {
        dispatch(fetchAllIncome());
        dispatch(fetchExpenses());
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    }
  }, [dispatch, session]);

  const formatDate = (dateString) => {
    const inputDate = new Date(dateString);
    return inputDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  const handleFilterClick = (filter) => {
    dispatch(CHANGE_FILTER(filter));
  };
  const filteredItems = () => {
    const allItems = [...incomes, ...expenses];

    switch (selectFilter) {
      case "daily":
        return allItems.filter((item) => {
          const itemDate = new Date(item.createdAt);
          const today = new Date();
          return (
            itemDate.getDate() === today.getDate() &&
            itemDate.getMonth() === today.getMonth() &&
            itemDate.getFullYear() === today.getFullYear()
          );
        });
      case "weekly":
        return allItems.filter((item) => {
          const itemDate = new Date(item.createdAt);
          const today = new Date();
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          return itemDate >= startOfWeek && itemDate <= today;
        });
      case "monthly":
        return allItems.filter((item) => {
          const itemDate = new Date(item.createdAt);
          const today = new Date();
          return (
            itemDate.getMonth() === today.getMonth() &&
            itemDate.getFullYear() === today.getFullYear()
          );
        });
      default:
        return [];
    }
  };

  return (
    <section className=" padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row w-85">
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <ul
          className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
          id="defaultTab"
          data-tabs-toggle="#defaultTabContent"
          role="tablist">
          <li className="me-2">
            <button
              id="expe-tab"
              data-tabs-target="#expenses"
              type="button"
              role="tab"
              aria-controls="Expe"
              aria-selected="false"
              onClick={() => handleTabClick("expenses")}
              className="inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300">
              Expense
            </button>
          </li>
          <li className="me-2">
            <button
              id="about-tab"
              data-tabs-target="#income"
              type="button"
              role="tab"
              aria-controls="Income"
              aria-selected="true"
              onClick={() => handleTabClick("income")}
              className="inline-block p-4 text-blue-600 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-500">
              Income
            </button>
          </li>
        </ul>
        <br />

        <div className="gap-6">
          <button
            onClick={() => handleFilterClick("daily")}
            className="bg-white text-black px-4 py-2 rounded mr-8">
            Daily
          </button>
          <button
            onClick={() => handleFilterClick("weekly")}
            className="bg-white text-black px-4 py-2 rounded mr-8">
            Weekly
          </button>
          <button
            onClick={() => handleFilterClick("monthly")}
            className="bg-white text-black px-4 py-2 rounded">
            Monthly
          </button>
        </div>
        <div className="max-container padding-container flex flex-col gap-20  pb-32 md:gap-28 lg:py-20 xl:flex-row w-[75vh]">
          <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
            <h2 className="text-2xl font-bold mb-4">History</h2>
            <div className="flex flex-col gap-4 mt-1">
              {(filteredItems() || []).map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl mb-4 xl:mb-0">
                  <div className="flex items-center gap-2">
                    <div>
                      <IoAddCircle className="text-white" size={25} />
                    </div>
                    <div className="flex flex-col col-span-2">
                      <h4 className="capitalize text-white ">{item.name}</h4>

                      <small className="text-xs text-gray-400">
                        {formatDate(item.createdAt)}
                      </small>
                    </div>
                  </div>

                  <small className="text-yellow-200">
                    {currencyUtils(item.amount)}
                  </small>
                </div>
              ))}
            </div>
          </div>
        </div>

        {activeTab === "expenses" ? <ExpenseChart /> : <IncomeChart />}
      </div>
    </section>
  );
};

export default Stats;
