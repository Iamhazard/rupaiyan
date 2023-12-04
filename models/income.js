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
    incomedate: {
      type: String,
      match: [
        /^\d{4}-\d{2}-\d{2}$/,
        "Please enter a valid date format (YYYY-MM-DD)",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Income = models.Income || model("Income", IncomeSchema);
export default Income;
