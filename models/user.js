import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists!"],
      required: [true, "Email is required!"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter valid email address",
      ],
    },
    username: {
      type: String,
      required: [true, "Username is required!"],
      unique: true,
      minlength: 8,
      maxlength: 20,
    },
    password: {
      type: String,
      required: [true, "please add a Password"],
      minLength: [6, "Password must be upto 6 character"],
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);
export default User;
