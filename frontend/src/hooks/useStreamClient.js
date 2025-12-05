import { useState, useEffect, useRef } from "react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import { initializeStreamClient, disconnectStreamClient } from "../lib/stream";
import { sessionApi } from "../api/sessions";

function useStreamClient(session, loadingSession, isHost, isParticipant) {
  const [streamClient, setStreamClient] = useState(null);
  const [call, setCall] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isInitializingCall, setIsInitializingCall] = useState(true);

  const isMountedRef = useRef(true);
  const initInProgressRef = useRef(false);
  const leaveInProgressRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    let videoCall = null;
    let chatClientInstance = null;

    const safeCallLeave = async (c) => {
      if (!c) return;
      if (leaveInProgressRef.current) return;
      leaveInProgressRef.current = true;
      try {
        if (typeof c.leave === "function") {
          await c.leave();
          return;
        }
        if (typeof c.leaveCall === "function") {
          await c.leaveCall();
          return;
        }
        if (typeof c.disconnect === "function") {
          await c.disconnect();
          return;
        }

        const state = c.state ?? c.status ?? null;
        if (state && /left|ended|disconnected/i.test(String(state))) {
          return;
        }

        if (typeof c.close === "function") {
          await c.close();
        }
      } catch (err) {
        const msg = String(err?.message || err);
        if (
          /already been left|already left|call has already been left/i.test(msg)
        ) {
          return;
        }
        console.error("safeCallLeave unexpected error:", err);
      } finally {
        leaveInProgressRef.current = false;
      }
    };

    const safeChatDisconnect = async (chatClient) => {
      if (!chatClient) return;
      try {
        if (typeof chatClient.disconnectUser === "function") {
          await chatClient.disconnectUser();
          return;
        }
        if (typeof chatClient.disconnect === "function") {
          await chatClient.disconnect();
          return;
        }
        if (typeof chatClient.close === "function") {
          await chatClient.close();
          return;
        }
      } catch (err) {
        const msg = String(err?.message || err);
        if (
          /already been left|already left|not connected|socket closed/i.test(
            msg
          )
        ) {
          return;
        }
        console.error("safeChatDisconnect unexpected error:", err);
      }
    };

    const initCall = async () => {
      if (!session?.callId) return;
      if (!isHost && !isParticipant) return;
      if (session.status === "completed") return;
      if (initInProgressRef.current) return;
      initInProgressRef.current = true;
      setIsInitializingCall(true);

      try {
        const { token, userId, userName, userImage } =
          await sessionApi.getStreamToken();

        const client = await initializeStreamClient(
          {
            id: userId,
            name: userName,
            image: userImage,
          },
          token
        );

        if (!isMountedRef.current) {
          await disconnectStreamClient().catch(() => {});
          return;
        }

        setStreamClient(client);

        videoCall = client.call("default", session.callId);
        await videoCall.join({ create: true });
        if (isMountedRef.current) setCall(videoCall);

        const apiKey = import.meta.env.VITE_STREAM_API_KEY;
        chatClientInstance = StreamChat.getInstance(apiKey);

        await chatClientInstance.connectUser(
          {
            id: userId,
            name: userName,
            image: userImage,
          },
          token
        );
        if (isMountedRef.current) setChatClient(chatClientInstance);

        const chatChannel = chatClientInstance.channel(
          "messaging",
          session.callId
        );
        await chatChannel.watch();
        if (isMountedRef.current) setChannel(chatChannel);
      } catch (error) {
        toast.error("Failed to join video call");
        console.error("Error init call", error);
      } finally {
        initInProgressRef.current = false;
        if (isMountedRef.current) setIsInitializingCall(false);
      }
    };

    if (session && !loadingSession) {
      initCall();
    }

    return () => {
      isMountedRef.current = false;

      (async () => {
        try {
          await safeCallLeave(videoCall);

          await safeChatDisconnect(chatClientInstance);

          await disconnectStreamClient();
        } catch (error) {
          console.error("Cleanup error:", error);
        } finally {
          videoCall = null;
          chatClientInstance = null;
        }
      })();
    };
  }, [session, loadingSession, isHost, isParticipant]);

  return {
    streamClient,
    call,
    chatClient,
    channel,
    isInitializingCall,
  };
}

export default useStreamClient;
