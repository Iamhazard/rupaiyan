//create new income

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

const getExpenses = async () => {
  const response = await axios.get("/api/expense");
  console.log(response);
  return response.data;
};

const incomeServices = {
  createIncome,
  createExpense,
  getExpenses,
};
export default incomeServices;
