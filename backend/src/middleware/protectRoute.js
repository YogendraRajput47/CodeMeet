import { clerkClient, requireAuth } from "@clerk/express";
import User from "../models/User.js";

// export const auth = async (_, res, next) => {
//   try {
//       requireAuth();
//     next();
//   } catch (error) {
//     console.error("Error in protectRoute middleware", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const pprotectRoute = async (req, res, next) => {
//   try {
//     const clerkId = await req.auth().userId;
//     // console.log(clerkId);
//     if (!clerkId)
//       return res.status(401).json({ message: "Unauthorized - Invalid Token" });
//     // find the user in db by clerkId
//     const user = await User.findOne({ clerkId });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     //attach user to req object
//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("Error in protectRoute middleware", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

export const auth = async (_, res, next) => {
  try {
    requireAuth();
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const pprotectRoute = async (req, res, next) => {
  try {
    const { isAuthenticated, userId } = getAuth(req);

    // If user isn't authenticated, return a 401 error
    if (!isAuthenticated) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    //attach user to req object
    const user = await clerkClient.users.getUser(userId);
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;
      if (!clerkId)
        return res
          .status(401)
          .json({ message: "Unauthorized - Invalid Token" });
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
  },
];
