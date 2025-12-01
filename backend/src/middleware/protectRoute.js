// import { clerkClient, getAuth, requireAuth } from "@clerk/express";
// import User from "../models/User.js";

// // export const auth = async (_, res, next) => {
// //   try {
// //       requireAuth();
// //     next();
// //   } catch (error) {
// //     console.error("Error in protectRoute middleware", error);
// //     return res.status(500).json({ message: "Internal server error" });
// //   }
// // };

// export const auth = async (_, res, next) => {
//   try {
//     requireAuth();
//     next();
//   } catch (error) {
//     console.error("Error in protectRoute middleware", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const pprotectRoute = async (req, res, next) => {
//   try {
//     const { isAuthenticated, userId } = getAuth(req);

//     // If user isn't authenticated, return a 401 error
//     if (!isAuthenticated) {
//       return res.status(401).json({ error: "User not authenticated" });
//     }

//     //attach user to req object
//     const user = await clerkClient.users.getUser(userId);
//     console.log(user);
//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("Error in protectRoute middleware", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const protectRoute = [
//   requireAuth(),
//   async (req, res, next) => {
//     try {
//       const clerkId = req.auth().userId;
//       if (!clerkId)
//         return res
//           .status(401)
//           .json({ message: "Unauthorized - Invalid Token" });
//       // find the user in db by clerkId
//       const user = await User.findOne({ clerkId });
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       //attach user to req object
//       req.user = user;
//       next();
//     } catch (error) {
//       console.error("Error in protectRoute middleware", error);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   },
// ];

import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const auth = async (_, res, next) => {
  try {
    requireAuth();
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const protectRoute = async (req, res, next) => {
  try {
    const clerkId = await req.auth().userId;
    console.log(req.auth());
    const isAuthenticated=req.auth().isAuthenticated
     if (typeof req.auth !== "function") {
        console.error("[protectRoute] req.auth is NOT a function - clerkMiddleware missing or failed");
        console.error("[protectRoute] headers:", {
          origin: req.get("origin"),
          cookiePresent: !!req.get("cookie"),
          authorizationPresent: !!req.get("authorization"),
        });
        return res.status(401).json({ message: "Unauthorized - auth middleware missing" });
      }

    // console.log(clerkId);
    if (!isAuthenticated) {
      return res.status(401).json({ message: "Unauthorized - Invalid Type" });
    }
    // find the user in db by clerkId
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //attach user to req object
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
