import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strict", true);

  if (isConnected) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Rupya",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      wtimeoutMS: 2500,
    });
    isConnected = true;
    console.log("MongoDb connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
