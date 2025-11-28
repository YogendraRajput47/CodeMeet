import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import {serve} from "inngest";
import { functions, inngest } from "./lib/inggest.js";
const app = express();

const __dirname = path.resolve();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: ENV.CLIENT_URL ,
    credentials: true,
  })
);

app.use("/api/inngest",serve({client:inngest,functions }))

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});
app.get("/books", (req, res) => {
  res.status(200).json({ message: "this is the book endpoint " });
});

// make our app ready for deployemnt
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.error("Error while the starting server", error);
  }
};

startServer();
