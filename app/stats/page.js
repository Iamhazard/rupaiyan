"use client";
import ExpenseChart from "@/components/ExpenseChart";
import IncomeChart from "@/components/IncomeChart";
import currencyUtils from "@/utils/currencyUtils";
import { IoAddCircle } from "react-icons/io5";
import React, { useState } from "react";

const Stats = () => {
  const [activeTab, setActiveTab] = useState("expenses");
  const handleTabClick = (tabId) => {
    console.log("Tab clicked:", tabId);
    setActiveTab(tabId);
  };

  const reports = [
    { id: 1, name: "Expense 1", amount: 5000, date: "December 2, 2023" },
    { id: 2, name: "Income 2", amount: 3000, date: "December 5, 2023" },
    { id: 3, name: "Expense 3", amount: 3000, date: "December 6, 2023" },
    { id: 4, name: "Income 4", amount: 3000, date: "December 10, 2023" },
  ];
  const formatDate = (dateString) => {
    const inputDate = new Date(dateString);
    return inputDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
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
          <button className="bg-white text-black px-4 py-2 rounded mr-8">
            Weekly
          </button>
          <button className="bg-white text-black px-4 py-2 rounded mr-8">
            Monthly
          </button>
          <button className="bg-white text-black px-4 py-2 rounded">
            Yearly
          </button>
        </div>
        <div className="max-container padding-container flex flex-col gap-20  pb-32 md:gap-28 lg:py-20 xl:flex-row w-[75vh]">
          <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Reports</h2>
            <div className="flex flex-col gap-4 mt-1">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl mb-4 xl:mb-0">
                  <div className="flex items-center gap-2">
                    <div>
                      <IoAddCircle className="text-white" size={25} />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="capitalize text-white">{report.name}</h4>
                      <small className="text-xs text-gray-400">
                        {formatDate(report.date)}
                      </small>
                    </div>
                  </div>

                  <small className="text-yellow-200">
                    {currencyUtils(report.amount)}
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
