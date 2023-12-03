"use client";
import { Chart } from "react-google-charts";

const expenses = [
  { id: 1, name: "Income 1", amount: 5000, date: "December 2, 2023" },
  { id: 2, name: "income 2", amount: 3000, date: "December 3, 2023" },
  { id: 3, name: "income 3", amount: 3000, date: "December 3, 2023" },
  { id: 4, name: "income 4", amount: 3000, date: "December 3, 2023" },
  { id: 5, name: "income 5", amount: 3000, date: "December 3, 2023" },
];

export const options = {
  title: "My Income",
  is3D: true,
};

export function IncomeChart() {
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

export default IncomeChart;
