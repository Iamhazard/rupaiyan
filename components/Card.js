"use client";
import currencyUtils from "@/utils/currencyUtils";
import { useDispatch, useSelector } from "react-redux";
import { CALCULATE_TOTAL_EXPENSES } from "@/Redux/Features/expenseSlice";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  CALCULATE_TOTAL_INCOMES,
  fetchAllIncome,
} from "@/Redux/Features/incomeSlice";
import { useSession } from "next-auth/react";

const Card = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expense.expenses);
  const incomes = useSelector((state) => state.income.incomes);
  const { data: session } = useSession();
  const totalExpensesValue = useSelector(
    (state) => state.expense.totalExpensesValue
  );

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_EXPENSES(expenses));
    dispatch(fetchAllIncome());
    if (session) {
      dispatch(CALCULATE_TOTAL_INCOMES(incomes));
    }
  }, [dispatch, expenses, incomes, session]);

  const handleIncomeClick = (e) => {
    e.preventDefault();
    console.log("Clicked Income");
    router.push("/form?type=Income");
  };

  const handleExpenseClick = (e) => {
    e.preventDefault();
    console.log("Clicked Expense");
    router.push("/form?type=Expense");
  };
  const totalExpenses = currencyUtils(totalExpensesValue);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {/* Income card */}
      <div className="bg-white border border-black p-4 gap-2 rounded-4xl shadow-md">
        <h2 className="text-xl font-bold flex items-center">
          <AiOutlineSortAscending size={30} className="mr-2" /> Income
        </h2>

        {session?.user ? (
          incomes &&
          incomes.map((income) => (
            <span key={income.id}>{currencyUtils(income.amount)}</span>
          ))
        ) : (
          <span>{currencyUtils(0)}</span>
        )}
        <br />
        <button
          onClick={handleIncomeClick}
          type="button"
          className="btn btn-primary mt-2 text-lg">
          {" "}
          {/* Increased button size and added margin top */}+ Income
        </button>
      </div>

      {/* Expense Card */}
      <div className="bg-white border border-black p-4 gap-2 rounded-4xl shadow-md">
        {" "}
        {/* Added gap between cards */}
        <h2 className="text-xl font-bold flex items-center">
          <AiOutlineSortDescending size={30} className="mr-2" /> Expense
        </h2>
        <span>{totalExpenses}</span>
        <br />
        <button
          name="expense-btn"
          type="button"
          onClick={handleExpenseClick}
          className="btn primary-outline mt-2 text-lg">
          {" "}
          {/* Increased button size and added margin top */}+ Expenses
        </button>
      </div>
    </div>
  );
};

export default Card;
