"use client";
import { getExpense } from "@/Redux/Features/expenseSlice";
import Form from "@/components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const EditItems = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { handleSubmit } = useForm();
  const params = useSearchParams();
  const type = params.get("type");
  const getname = params.get("name");
  console.log(getname);
  console.log("type", type);

  const editIncome = () => {
    console.log("editing item income");
  };
  const editExpense = () => {
    console.log("editing item");
  };

  const navigateToHome = () => {
    router.push("/");
  };

  useEffect(() => {
    const fetchExpense = async () => {
      await dispatch(getExpense(id));
    };
    fetchExpense();
  }, [dispatch]);

  return (
    <Form
      onhandleSubmit={handleSubmit(
        type === "Income" ? editIncome : editExpense
      )}
      handleClick={navigateToHome}
    />
  );
};

export default EditItems;
