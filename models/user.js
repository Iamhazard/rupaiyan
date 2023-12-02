import { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";
const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists!"],
      sparse: true,
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
      minlength: [6, "Password must be upto 6 character"],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const User = models.User || model("User", UserSchema);
export default User;
