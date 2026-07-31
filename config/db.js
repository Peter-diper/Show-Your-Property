import mongoose from "mongoose";
let connected = false;

async function connectDB() {
  mongoose.set("strictQuery", true);

  if (connected) {
    console.log("data base is alreay connected");
    return;
  }

  try {
    // we should connect it to data base
    console.log("connecting to database...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to data base");
  } catch (error) {
    console.log(error);
  }
}

export default connectDB;
