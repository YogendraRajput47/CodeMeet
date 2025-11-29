import React from "react";
import Navbar from "../components/Navbar";

import {PROBLEMS} from "../data/problems"
import Header from "../components/Problems/Header";
import ProblemList from "../components/Problems/ProblemList";
import StatsFooter from "../components/Problems/StatsFooter";

function ProblemsPage() {

    const problems=Object.values(PROBLEMS);

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <Header/>

        {/* Problem list */}
        <ProblemList problems={problems}/>

        {/* Stats Footer */}
        <StatsFooter problems={problems}/>
      </div>
    </div>
  );
}

export default ProblemsPage;
