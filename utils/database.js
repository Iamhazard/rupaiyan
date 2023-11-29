import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  console.log("MongoDB_URI:", process.env.MONGO_URI);
  mongoose.set("strict", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Rupya",
    });
    isConnected = true;
    console.log("MongoDb connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
