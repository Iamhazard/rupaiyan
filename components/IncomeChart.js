"use client";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";

export const options = {
  title: "My Income",
  is3D: true,
};

export function IncomeChart() {
  const incomes = useSelector((state) => state.income.incomes);

  const chartData = incomes.map((income) => [
    income.name,
    parseFloat(income.amount),
  ]);

  const chartDataWithColumns = [["Income", "Amount"], ...chartData];
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
