//create new income

import { headers } from "@/next.config";
import axios from "axios";

const createIncome = async (data) => {
  console.log("formdata", data);

  const response = await axios.post("/api/income/new", data);
  return response.data;
};

//create a new expenses

const createExpense = async (data) => {
  const response = await axios.post("/api/expense/new", data);

  return response.data;
};

//get expenes

const getAllExpenses = async () => {
  try {
    const response = await fetch("/api/expense", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("api response from services", response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
};

const incomeServices = {
  createIncome,
  createExpense,
  getAllExpenses,
};
export default incomeServices;
