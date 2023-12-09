import mongoose, { Schema, model, models } from "mongoose";

const IncomeSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "name is required!"],
      match: [/^[a-zA-Z]$/, "Please enter valid name address"],
    },
    amount: {
      type: String,
      required: [true, "amount is required!"],
    },
    category: {
      type: String,
      required: [true, "please add a category"],
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Income = models.Income || model("Income", IncomeSchema);
export default Income;
