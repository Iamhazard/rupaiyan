import mongoose, { Schema, model, models } from "mongoose";

const IncomeSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
    },
    amount: {
      type: String,
      required: [true, "amount is required!"],
    },
    category: {
      type: String,
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
