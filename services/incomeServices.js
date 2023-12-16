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

//get a single

const getExpenseById = async (id) => {
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

// Update Expense
const updateExpense = async (id, formData) => {
  const response = await axios.patch(`/api/expense/${id}`, formData);
  return response.data;
};

//get userID expenses

const getExpensesByUserId = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}/expenses`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Bad Request: ${errorText}`);
    }
    const data = await response.json();
    console.log("DaTA FROM EXPENSES", data);
    return data;
  } catch (error) {
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Status code:", error.response.status);
    } else {
      console.error("Error in getExpensesByUserId:", error.message);
    }
    throw error;
  }
};

const incomeServices = {
  createIncome,
  createExpense,
  getAllExpenses,
  getAllIncomes,
  deleteExpenseById,
  getExpenseById,
  updateExpense,
  getExpensesByUserId,
};
export default incomeServices;
