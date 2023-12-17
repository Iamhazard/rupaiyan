"use client";
import React, { useEffect, useState } from "react";
import { MdEditAttributes } from "react-icons/md";
import currencyUtils from "@/utils/currencyUtils";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import {
  deleteExpense,
  fetchExpenses,
  selectExpenses,
} from "@/Redux/Features/expenseSlice";
import Link from "next/link";
import { HiMiniTrash } from "react-icons/hi2";
import Modals from "./Modals";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/navigation";
import { SET_LOGIN } from "@/Redux/Features/authSlice";

const formatDate = (dateString) => {
  const inputDate = new Date(dateString);
  return inputDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const ExpenseItems = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedExpense, setSelectedExpense] = useState(null);
  const expenses = useSelector(selectExpenses);

  const { data: session } = useSession();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(SET_LOGIN(true));
      await dispatch(fetchExpenses(session?.user.id));
    };
    fetchData();
  }, [dispatch, session?.user.id]);

  //begin pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    // console.log("Type of expenses:", typeof expenses);
    if (Array.isArray(expenses)) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(expenses.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(expenses.length / itemsPerPage));
    } else {
      console.error("Expenses is not an array:", expenses);
    }
  }, [expenses, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % expenses.length;
    setItemOffset(newOffset);
  };

  //END OF PAGINATION

  const handleDeleteClick = (expense) => {
    console.log("Delete clicked:", expense);
    setSelectedExpense(expense);
  };
  const handleCancel = () => {
    console.log("Cancel clicked");
    setSelectedExpense(null);
  };

  const handelConfirm = async (_id) => {
    if (selectedExpense && selectedExpense._id) {
      console.log("Deleting expense:", selectedExpense);
      await dispatch(deleteExpense(selectedExpense._id));

      await dispatch(fetchExpenses());
    } else {
      console.error("Selected expense or its _id is undefined.");
      setSelectedExpense(null);
    }
  };
  const handleEdit = (expense) => {
    if (expense) {
      router.push(`/update-items/?id=${expense._id}`);
    }
  };

  return (
    <section className="py-4">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-xl">
        <div className="relative flex flex-1 flex-col xl:flex-row">
          <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
            <h2 className="text-2xl font-bold mb-4">My Expenses</h2>

            {session?.user?.id ? (
              <div className="flex flex-col gap-4 mt-1">
                {selectedExpense && (
                  <Modals onCancel={handleCancel} onConfirm={handelConfirm} />
                )}
                {currentItems &&
                  currentItems.map((expense) => (
                    <div
                      key={expense.id}
                      className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl mb-4 xl:mb-0">
                      <div className="flex items-center gap-2">
                        <div>
                          <MdEditAttributes
                            onClick={() => handleEdit(expense)}
                            className="text-white"
                            size={23}
                          />
                        </div>
                        <div className="flex flex-col">
                          <h4 className="capitalize text-white">
                            {expense.name}
                          </h4>
                          <small className="text-xs text-gray-400">
                            {formatDate(expense.createdAt)}
                          </small>
                        </div>
                      </div>

                      <small className="text-yellow-200">
                        {currencyUtils(expense.amount)}
                      </small>

                      <p className="font-inter text-sm  cursor-pointer">
                        <HiMiniTrash
                          color="white"
                          size={23}
                          onClick={() => handleDeleteClick(expense)}
                        />
                      </p>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="p-8 h-15 border w-15 shadow-lg rounded-md bg-white gap-3">
                <div className="text-center">
                  <div className="mt-2 px-7 py-3">
                    <p className="text-lg text-gray-500">
                      <Link className="text-blue-300  " href="/login">
                        Login
                      </Link>
                      <span> to see Expenses</span>
                    </p>
                  </div>
                  <div className="flex justify-center mt-4"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="NEXT >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel="< Prev"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="activePage"
      />
    </section>
  );
};

export default ExpenseItems;
