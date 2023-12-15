"use client";
import React, { useState, Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Currency } from "./Navlinks/NavLinks";
import { FaCheck } from "react-icons/fa";
import { FaChevronCircleDown } from "react-icons/fa";
import Card from "./Card";
import { useSession } from "next-auth/react";
import currencyUtils from "@/utils/currencyUtils";
import ExpenseItems from "./ExpenseItems";
import { useDispatch, useSelector } from "react-redux";
import { CALCULATE_TOTAL_EXPENSES } from "@/Redux/Features/expenseSlice";
import { CALCULATE_TOTAL_INCOMES } from "@/Redux/Features/incomeSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const incomes = useSelector((state) => state.income.incomes);
  const expenses = useSelector((state) => state.expense.expenses);
  const totalIncomeValue = useSelector(
    (state) => state.income.totalIncomeValue
  );
  const totalExpensesValue = useSelector(
    (state) => state.expense.totalExpensesValue
  );

  const [selectedCurrency, setSelectedCurrency] = useState(Currency[0]);
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      dispatch(CALCULATE_TOTAL_INCOMES(incomes));
      dispatch(CALCULATE_TOTAL_EXPENSES(expenses));
    }
  }, [dispatch, incomes, expenses, session]);

  const finalIncome = currencyUtils(totalIncomeValue - totalExpensesValue);
  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-9 lg:px-10 py-8 rounded-3xl w-58 max-w-xl">
        <div className="feed-image" />
        <div className="relative z-20 flex flex-1 flex-col xl:w-1/2"></div>
        <div className="relative mt-0">
          {!session?.user ? (
            <small className="text-xl">
              Hi! if you want to save your <br />
              <span className="text-yellow-500 "> data sync </span> with the
              cloud
            </small>
          ) : (
            <small className="text-xl">
              Hi! <span className="text-green-500">{session.user.name}</span>{" "}
              <br />
              Welcome to
              <span className="text-blue-500 ">Rupaiyan</span>!
            </small>
          )}

          <Listbox value={selectedCurrency} onChange={setSelectedCurrency}>
            <div className="absolute top-0 right-0 mt-[-2]">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm">
                <span className="block truncate">{selectedCurrency.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <FaChevronCircleDown
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <Listbox.Options className="absolute mt-1 max-h-60 w-50 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                  {Currency.map((currency, currencyIdx) => (
                    <Listbox.Option
                      key={currencyIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                      value={currency}
                      onClick={() => setSelectedCurrency(currency)}>
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}>
                            {currency.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <FaCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        <div className="flex flex-col mt-4 sm:flex-row sm:items-center"></div>
        <small className="text-gray-600 text-2xl  text-md"> My Balance</small>
        <h2 className=" text-4xl font'">{finalIncome}</h2>
        <Card />
        {/*report */}

        <ExpenseItems />
      </div>
    </section>
  );
};

export default Feed;
