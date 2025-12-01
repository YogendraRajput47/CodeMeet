// import express from "express";
// import { ENV } from "./lib/env.js";
// import path from "path";
// import { connectDB } from "./lib/db.js";
// import cors from "cors";
// import { serve } from "inngest/express";
// import { functions, inngest } from "./lib/inggest.js";
// import { clerkMiddleware } from "@clerk/express";
// import chatRoutes from "./routes/chatRoutes.js";
// import sessionRoutes from "./routes/sessionRoutes.js";
// const app = express();

// const __dirname = path.resolve();

// // middlewares
// app.use(express.json());
// app.use(
//   cors({
//     origin: ENV.CLIENT_URL || "*",
//     credentials: true,
//   })
// );
// app.use(clerkMiddleware()); //this will add auth field to the request object:req.auth()
// app.use((req, res, next) => {
//   console.log(`[REQ] ${new Date().toISOString()} ${req.method} ${req.originalUrl} - Referer:${req.get('referer') || 'none'} - Origin:${req.get('origin') || 'none'} - Cookie:${!!req.get('cookie')} - UA:${req.get('user-agent')?.slice(0,80) || 'none'}`);
//   next();
// });


// app.use("/api/inngest", serve({ client: inngest, functions }));
// app.use("/api/chat", chatRoutes);

// app.use("/api/sessions", sessionRoutes);




// app.get("/books", (req, res) => {
//   res.status(200).json({ message: "this is the book endpoint " });
// });

// // make our app ready for deployemnt
// // if (ENV.NODE_ENV === "production") {
// //   app.use(express.static(path.join(__dirname, "../frontend/dist")));

// //   app.get("/{*any}", (req, res) => {
// //     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
// //   });
// // }

// const startServer = async () => {
//   try {
//     await connectDB();
//     app.listen(ENV.PORT, () => {
//       console.log(`Server is running on port ${ENV.PORT}`);
//     });
//   } catch (error) {
//     console.error("Error while the starting server", error);
//   }
// };

// startServer();



import express from "express";
import path from "path";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inggest.js";

import chatRoutes from "./routes/chatRoutes.js";
// import sessionRoutes from "./routes/sessionRoute.js";
import sessionRoutes from "./routes/sessionRoutes.js"

const app = express();

const __dirname = path.resolve();

// middleware
app.use(express.json());
// credentials:true meaning?? => server allows a browser to include cookies on request
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(clerkMiddleware()); // this adds auth field to request object: req.auth()

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});

// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => console.log("Server is running on port:", ENV.PORT));
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();
