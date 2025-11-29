// src/components/Home/UseCasesSection.jsx
import React from "react";
import {
  UserCheck,
  Users,
  BookOpen,
  Briefcase,
  Rocket,
  Globe,
  ArrowRightIcon,
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

export default function UseCasesSection() {
  return (
    <section id="use-cases" className="max-w-7xl mx-auto px-4 py-20">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-3">
          Real Ways People Use{" "}
          <span className="text-primary font-mono">CodeMeet</span>
        </h2>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          From interviews to team debugging sessions — CodeMeet fits into real
          developer workflows.
        </p>
      </div>

      {/* Use cases grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Use case 1 */}
        <div className="flex gap-4 items-start bg-base-100 border border-base-300 rounded-xl p-6">
          <div className="p-3 rounded-lg bg-base-200">
            <UserCheck className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Technical Interviews</h3>
            <p className="text-sm text-base-content/70 mt-1 max-w-xs">
              Structured interview rooms with live coding, video chat, and
              private feedback — ideal for hiring.
            </p>
          </div>
        </div>

        {/* Use case 2 */}
        <div className="flex gap-4 items-start bg-base-100 border border-base-300 rounded-xl p-6">
          <div className="p-3 rounded-lg bg-base-200">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Pair Programming</h3>
            <p className="text-sm text-base-content/70 mt-1 max-w-xs">
              Real-time co-editing plus video makes collaborating on bugs and
              features fast and frictionless.
            </p>
          </div>
        </div>

        {/* Use case 3 */}
        <div className="flex gap-4 items-start bg-base-100 border border-base-300 rounded-xl p-6">
          <div className="p-3 rounded-lg bg-base-200">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              Mock Interviews & Practice
            </h3>
            <p className="text-sm text-base-content/70 mt-1 max-w-xs">
              Hands-on practice sessions to level up algorithmic thinking and
              interview readiness.
            </p>
          </div>
        </div>

        {/* Use case 4 */}
        <div className="flex gap-4 items-start bg-base-100 border border-base-300 rounded-xl p-6">
          <div className="p-3 rounded-lg bg-base-200">
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              Technical Hiring Workshops
            </h3>
            <p className="text-sm text-base-content/70 mt-1 max-w-xs">
              Run group interview workshops, assess candidates, and share
              highlights with stakeholders.
            </p>
          </div>
        </div>

        {/* Use case 5 */}
        <div className="flex gap-4 items-start bg-base-100 border border-base-300 rounded-xl p-6">
          <div className="p-3 rounded-lg bg-base-200">
            <Rocket className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Onboarding & Demos</h3>
            <p className="text-sm text-base-content/70 mt-1 max-w-xs">
              Walk new hires or customers through codebases and features with
              live sessions and commentary.
            </p>
          </div>
        </div>

        {/* Use case 6 */}
        <div className="flex gap-4 items-start bg-base-100 border border-base-300 rounded-xl p-6">
          <div className="p-3 rounded-lg bg-base-200">
            <Globe className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">
              Remote Interviews Worldwide
            </h3>
            <p className="text-sm text-base-content/70 mt-1 max-w-xs">
              Reliable sessions for distributed teams — low-latency editor sync
              and stable video.
            </p>
          </div>
        </div>
      </div>

      {/* CTA row */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
        <SignInButton mode="modal">
          <button className="group px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-2 cursor-pointer">
            <span>Let's Get Started</span>
            <ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </SignInButton>
        <a href="#how-it-works" className="btn btn-outline btn-lg">
          Learn How It Works
        </a>
      </div>
    </section>
  );
}
