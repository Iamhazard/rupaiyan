"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchIncome } from "@/Redux/Features/incomeSlice";
import { fetchExpense } from "@/Redux/Features/expenseSlice";
import { useSession } from "next-auth/react";
import { pageExtensions } from "@/next.config";

const CreateForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const { data: session } = useSession();
  // console.log("Session:", session);
  const dispatch = useDispatch();
  const navigateToHome = () => {
    router.push("/");
  };
  const params = useSearchParams();

  const type = params.get("type");

  const handleIncome = async (data) => {
    const userId = session?.user.id;

    try {
      await dispatch(fetchIncome({ ...data, userId }));

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(type);

  const handleExpense = async (data) => {
    const userId = session?.user.id;
    try {
      await dispatch(fetchExpense({ ...data, userId }));
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
      <div className="relative sm:max-w-2xl w-full">
        <div className="card bg-blue-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
        <div className="card bg-red-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>

        <div className="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
          <label
            htmlFor=""
            className="block mt-3 text-sm text-gray-700 text-center font-semibold">
            {type}
          </label>
          <button className="navbar-close" onClick={navigateToHome}>
            <svg
              className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <form
            className="mt-10"
            onSubmit={handleSubmit(
              type === "Income" ? handleIncome : handleExpense
            )}>
            <div className="mt-7">
              <input
                type="text"
                placeholder={`Enter a ${type} name`}
                name="name"
                {...register("name", {
                  required: true,
                  pattern: /^[A-Za-z][A-Za-z\s]+$/,
                })}
                className="mt-1 block w-full border-none bg-gray-100 h-12 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mt-7">
              <input
                type="number"
                placeholder="Amount"
                name="amount"
                {...register("amount", {
                  required: "amount is required",
                  pattern: {
                    value: /^[0-9]+(\.[0-9]{1,2})?$/, // Regular expression for price format (e.g., 12.34)
                    message: "Invalid Amount format",
                  },
                })}
                className="mt-1 block w-full border-none bg-gray-100 h-12 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
              )}
            </div>

            <div className="mt-7">
              <input
                type="text"
                placeholder="Category"
                name="category"
                {...register("category", {
                  required: true,
                  pattern: /^[A-Za-z][A-Za-z\s]+$/,
                })}
                className="mt-1 block w-full border-none bg-gray-100 h-12 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            <div className="mt-7">
              <textarea
                name="notes"
                type="text"
                placeholder="notes"
                {...register("notes", {
                  required: true,
                  minLength: 2,
                })}
                className="block p-2.5 text-sm text-gray-900 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1 w-full border-none bg-gray-100 h-32 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
              />
              {errors.notes && (
                <p className="text-red-500 text-sm mt-1">{errors.notes}</p>
              )}
            </div>
            <div className="mt-7">
              <button className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateForm;
