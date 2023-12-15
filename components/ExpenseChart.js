"use client";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";

export const options = {
  title: "My Expenses",
  is3D: true,
};

export function ExpenseChart() {
  const expenses = useSelector((state) => state.expense.expenses);
  console.log(expenses);

  const chartData = expenses.map((expense) => [
    expense.name,
    parseFloat(expense.amount),
  ]);
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
