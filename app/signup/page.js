"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { SET_USER, selectIsAuthenticated } from "@/Redux/Features/authSlice";

const Signup = () => {
  const [isloading, setisLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const Router = useRouter();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    // If the user is already logged in, update the Redux state
    if (isAuthenticated) {
      Router.push("/");
    }
  }, [isAuthenticated, Router]);

  const onSubmitRegister = async (data, e, user) => {
    e.preventDefault();
    console.log(data);
    setisLoading(true);
    try {
      const result = await signIn("signUp", { ...data, callbackUrl: "/" });
      if (data.password !== data.confirmPassword) {
        alert("password confirmation doesnt match");
      }
      if (result?.ok) {
        await dispatch(
          SET_USER({ name: result?.user?.name, isAuthenticated: true })
        );
        Router.push("/");
        setisLoading(false);
        alert("registration sucessfull");
      } else {
        console.error("Signup failed");
        setisLoading(false);
        alert("An error occurred during registration.");
      }
    } catch (error) {
      setisLoading(false);
      console.error(error);
      alert("An error occurred during registration.");
    }
  };

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
              pattern: /^[A-Za-z][A-Za-z\s]+$/,
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

export default Signup;
