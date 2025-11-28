import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";

export const inngest = new Inngest({ id: "codemeet" });

const syncUser = inngest.createFunction(
  {
    id: "sync-user",
  },
  {
    event: "clerk/user.created",
  },
  async ({ event }) => {
    await connectDB();
    try {
      const { id, email_addresses, first_name, last_name, image_url } =
        event.data;
      console.log(id, email_addresses, first_name, last_name, image_url);

      const newUser = {
        clerkId: id,
        email: email_addresses[0]?.email_address,
        name: `${first_name || ""} ${last_name || ""}`,
        profileImage: image_url,
      };
      await User.create(newUser);
      console.log("User created");
    } catch (error) {
      console.log("inngest create user error ", error);
    }
  }
);

const deleteUserFromDB = inngest.createFunction(
  {
    id: "delete-user-from-db",
  },
  {
    event: "clerk/user.deleted",
  },
  async ({ event }) => {
    try {
      await connectDB();
      const { id } = event.data;
      await User.deleteOne({ clerkId: id });
    } catch (error) {
      console.log("delete user error",error);
    }
  }
);

export const functions = [syncUser, deleteUserFromDB];
