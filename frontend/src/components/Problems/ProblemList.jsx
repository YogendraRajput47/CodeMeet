import { ChevronRightCircleIcon, Code2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { getDifficultyBadgeClass } from "../../lib/utils";

function ProblemList({ problems }) {
  return (
    <div className="space-y-4">
      {problems.map((problem) => (
        <Link
          key={problem.id}
          to={`/problem/${problem.id}`}
          className="card bg-base-100 hover:scale-[1.01] transition-transform"
        >
          <div className="card-body">
            <div className="flex items-center justify-between gap-4">
              {/* Left side */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 ">
                  <div className="size-12 rounded-lg  bg-primary/10 flex items-center flex-shrink">
                    <Code2Icon className="size-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-bold">{problem.title}</h2>
                      <span
                        className={`badge
                         ${getDifficultyBadgeClass(problem.difficulty)}`}
                      >
                        {problem.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-base-content/60">
                      {problem.category}
                    </p>
                  </div>
                </div>
                <p className="text-base-content/80 mb-3">{problem.description.text }</p>
              </div>
              {/* Right side */}
              <div className="flex items-center gap-2 text-primary">
                 <span className="font-medium">Solve</span>
                 <ChevronRightCircleIcon className="size-5"/>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProblemList;
