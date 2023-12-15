import React from "react";
import { IoAddCircle } from "react-icons/io5";

const Profile = ({ name, expenses, expense }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">
        Welcome to your personalized profile page
      </p>

      <div className="flex flex-col gap-4 mt-1">
        {expenses &&
          expenses.map((expense) => (
            <div
              key={expense.id}
              onClick={handleEdit}
              className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl mb-4 xl:mb-0">
              <div className="flex items-center gap-2">
                <div>
                  <IoAddCircle className="text-white" size={25} />
                </div>
                <div className="flex flex-col">
                  <h4 className="capitalize text-white">{expense.name}</h4>
                  <small className="text-xs text-gray-400">
                    {formatDate(expense.createdAt)}
                  </small>
                </div>
              </div>

              <small className="text-yellow-200">
                {currencyUtils(expense.amount)}
              </small>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Profile;
