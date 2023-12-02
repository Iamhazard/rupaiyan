import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strict", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    console.log("MongoDB_URI:", process.env.MONGO_URI);
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Rupya",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 10,
    });
    isConnected = true;
    console.log("MongoDb connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
