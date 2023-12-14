//create new income
import axios from "axios";

const createIncome = async (data) => {
  const response = await axios.post("/api/income/new", data);
  return response.data;
};

//create a new expenses

const createExpense = async (data) => {
  const response = await axios.post("/api/expense/new", data);

  return response.data;
};

const getAllIncomes = async () => {
  try {
    const response = await fetch("/api/income", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

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

//get expenes

const getAllExpenses = async () => {
  try {
    const response = await fetch("/api/expense", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

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

//get all income

const incomeServices = {
  createIncome,
  createExpense,
  getAllExpenses,
  getAllIncomes,
};
export default incomeServices;
