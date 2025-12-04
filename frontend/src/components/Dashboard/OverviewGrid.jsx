import React from "react";
import ActiveSessions from "./ActiveSessions";
import StatsCards from "./StatsCards";
import RecentSessions from "./RecentSessions";

function OverviewGrid({
  activeSessionsCount,
  recentSessionsCount,
  isUserInSession,
  sessions,
  isLoading,
  recentSessions,
  isLoad
}) {


  return (
    <div className="container mx-auto px-6 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StatsCards
          activeSessionsCount={activeSessionsCount}
          recentSessionsCount={recentSessionsCount}
        />
        <ActiveSessions
          sessions={sessions}
          isLoading={isLoading}
          isUserInSession={isUserInSession}
        />
      </div>

      {/* RecentSessions */}
      <RecentSessions sessions={recentSessions} isLoading={isLoad} />
    </div>
  );
}

export default OverviewGrid;
