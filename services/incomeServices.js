//create new income
import axios from "axios";

const createIncome = async (data) => {
  const response = await axios.post("/api/income/new", data);
  return response.data;
};

//create a new expenses

const createExpense = async (data) => {
  const response = await axios.post("/api/expense/new", data);
  return response;
};

//get all income
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

//delete expenses
const deleteExpenseById = async (id) => {
  console.log("id from servces", id);
  try {
    const response = await fetch(`/api/expense/${id.toString()}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting expense:", error);

    throw error;
  }
};

const incomeServices = {
  createIncome,
  createExpense,
  getAllExpenses,
  getAllIncomes,
  deleteExpenseById,
};
export default incomeServices;
