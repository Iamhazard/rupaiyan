"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import Link from "next/link";
import { registerUser } from "@/services/authServices";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_USER } from "@/Redux/Features/authSlice";

const SignupAccount = () => {
  const [isloading, setisLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const Router = useRouter();
  const dispatch = useDispatch();

  const onSubmitRegister = async (data) => {
    try {
      setisLoading(true);
      if (data.password !== data.confirmPassword) {
        alert("Password confirmation does not match!");
      } else {
        const formData = await registerUser(data);
        await dispatch(SET_LOGIN(true));
        await dispatch(SET_USER(formData));
        console.log(formData);
        Router.push("/");
        setisLoading(false);
        alert("Registration successful");
      }
    } catch (error) {
      setisLoading(false);
      console.error(error);
      alert("An error occurred during registration.");
    }
  };

  // const onSubmitRegister = async (data) => {
  //   setisLoading(true);
  //   if (data.password !== data.confirmPassword) {
  //     alert("Password confirmation does not match!");
  //   }
  //   try {
  //     const res = await fetch("/api/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (res.ok) {
  //       const form = data;
  //       reset();
  //       Router.push("/");
  //     } else {
  //       console.log("User registration failed.");
  //     }
  //   } catch (error) {
  //     console.log("Error during registration: ", error);
  //   }
  // };
  return (
    <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
      <div className="flex flex-col items-center mt-[5vh]">
        <h2 className="mb-5 text-gray-900 font-mono font-bold text-xl">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmitRegister)}>
          <input
            type="text"
            className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium "
            placeholder="Email"
            name="email"
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email && (
            <span className="text-green-600 text-bold">Invalid email</span>
          )}
          <input
            type="text"
            className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium "
            placeholder="Username"
            name="username"
            {...register("username", {
              required: true,
            })}
          />
          {errors.username && (
            <span className="text-green-600 text-bold">Invalid Name</span>
          )}
          <input
            type="password"
            className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium "
            placeholder="Password"
            name="password"
            {...register("password", {
              required: true,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            })}
          />
          {errors.password && (
            <span className="text-green-600 text-bold">
              Please enter Strong Password
            </span>
          )}
          <input
            type="password"
            className="w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium "
            placeholder="Confirm password"
            name="confirmPassword"
            {...register("confirmPassword", {
              required: true,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            })}
          />
          {errors.confirmPassword && (
            <span className="text-green-600 text-bold">
              Password does not match!
            </span>
          )}

          <button
            className="bg-slate-500 hover:bg-slate-700 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-full text-[19px]"
            disabled={isloading}>
            <span className="mr-2 uppercase">
              {isloading ? "Signing Up..." : "Sign Up"}
            </span>
          </button>
        </form>
        <p className="text-center mt-3 text-[14px]">
          Already have an account?
          <Link href="/signup" className="text-gray-600">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupAccount;
