import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// mongodb+srv://<username>:<password>@cluster0.gchpc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// connect to mlab db (atlas)
// uri is from cloud.mongodb.com
// for modifying user access / removing access => go to database access in atlas > database access
// for viewing database => go to atlas > project > database > cluster

const connectMongo = () => {
  const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.gchpc.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("connected to mlab db");
    }
  );
};

export default connectMongo;
