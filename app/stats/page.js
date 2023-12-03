"use client";
import ExpenseChart from "@/components/ExpenseChart";
import IncomeChart from "@/components/IncomeChart";

import React, { useState } from "react";

const Stats = () => {
  const [activeTab, setActiveTab] = useState("expenses");
  const handleTabClick = (tabId) => {
    console.log("Tab clicked:", tabId);
    setActiveTab(tabId);
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
        <h1>Reports</h1>
        <div className="gap-4">
          <button className="bg-white text-black px-4 py-2 rounded mr-4">
            Weekly
          </button>
          <button className="bg-white text-black px-4 py-2 rounded mr-4">
            Monthly
          </button>
          <button className="bg-white text-black px-4 py-2 rounded">
            Yearly
          </button>
        </div>

        {activeTab === "expenses" ? <ExpenseChart /> : <IncomeChart />}
      </div>
    </section>
  );
};

export default Stats;
