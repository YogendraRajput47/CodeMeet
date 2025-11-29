import { chatClient } from "../lib/stream.js";


//getStreamToken Controller
export async function getStreamToken(req, res) {
  try {
    //user clerk id for stream not mongodb _id=>it should match the id we have in the stream dashboard
    const token = chatClient.createToken(req.user.clerkId);

    res.status(200).json({
      token,
      userId: req.user.clerkId,
      userName: req.user.name,
      image: req.user.image,
    });
  } catch (error) {
    console.error("Error in getStreamToken controller", error.message);
    res.status(500).json({ msg: "Internal Server error" });
  }
}
