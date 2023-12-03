"use client";
import { Chart } from "react-google-charts";

const expenses = [
  { id: 1, name: "Expense 1", amount: 5000, date: "December 2, 2023" },
  { id: 2, name: "Expense 2", amount: 3000, date: "December 3, 2023" },
  { id: 3, name: "Expense 3", amount: 3000, date: "December 3, 2023" },
  { id: 4, name: "Expense 4", amount: 3000, date: "December 3, 2023" },
  { id: 5, name: "Expense 5", amount: 3000, date: "December 3, 2023" },
];

export const options = {
  title: "My Expenses",
  is3D: true,
};

export function ExpenseChart() {
  const chartData = expenses.map((expense) => [expense.name, expense.amount]);

  const chartDataWithColumns = [["Expense", "Amount"], ...chartData];
  return (
    <Chart
      chartType="PieChart"
      data={chartDataWithColumns}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}

export default ExpenseChart;
