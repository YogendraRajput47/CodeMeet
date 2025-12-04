import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import {
  useActiveSessions,
  useCreateSession,
  useMyRecentSessions,
} from "../hooks/useSessions";
import Navbar from "../components/Navbar";
import WelcomSession from "../components/Dashboard/WelcomSession";
import OverviewGrid from "../components/Dashboard/OverviewGrid";
import CreateSessionModal from "../components/Dashboard/CreateSessionModal";

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCreateModal, setsShowCreateModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({ problem: "", difficulty: "" });

  const createSessionMutation = useCreateSession();
  const { data: activeSessionsData, isLoading: loadingActiveSessions } =
    useActiveSessions();
  const { data: recentSessionsData, isLoading: loadingRecentSessions } =
    useMyRecentSessions();

  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) return;
    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty.toLowerCase(),
      },
      {
        onSuccess: (data) => {
          setsShowCreateModal(false);
          navigate(`/session/${data.session._id}`);
        },
      }
    );
  };

  const activeSessions = activeSessionsData?.sessions || [];
  const recentSessions = recentSessionsData?.sessions || [];


  const isUserInSession=(session)=>{
    if(!user.id) return false;

    return session.host?.clerkId===user.id || session.participant?.clerkId===user.id
  }

  return (
    <>
      <div className="min-h-screen bg-base-300">
        <Navbar />
        <WelcomSession onCreateSession={() => setsShowCreateModal(true)} />

        {/* Grid Layout */}
        <OverviewGrid
          activeSessionsCount={activeSessions.length}
          recentSessionsCount={recentSessions.length}
          isUserInSession={isUserInSession}
          sessions={activeSessions}
          isLoading={loadingActiveSessions}
          isLoad={loadingRecentSessions}
          recentSessions={recentSessions}
        />
      </div>

      {/* CreateSessionModal */}
      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setsShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />
    </>
  );
}

export default DashboardPage;
