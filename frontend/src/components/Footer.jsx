// src/components/Footer.jsx
import React from "react";
import { Mail, Github, X, Globe, Code, ArrowRightIcon, Linkedin } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Branding + short */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-base-100 p-2 shadow">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold">CodeMeet</h3>
                <p className="text-sm text-base-content/60 -mt-1">
                  Collaborative coding, simplified
                </p>
              </div>
            </div>

            <p className="text-sm text-base-content/70 max-w-sm">
              CodeMeet brings developers together — live editor, video chat, and
              collaborative sessions that scale with your team.
            </p>

            <div className="flex items-center gap-3 mt-2">
              <a
                href="mailto:support@codemeet.app"
                aria-label="Email support"
                className="btn btn-ghost btn-sm gap-2"
              >
                <Mail className="w-4 h-4" />
                support
              </a>

              <SignInButton mode="modal">
                <button className="group px-3 py-2 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-2 cursor-pointer">
                  <span> Get Started</span>
                  <ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </SignInButton>
            </div>
          </div>

          {/* Sitemap / Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-base-content/70">
                <li>
                  <a href="#features" className="hover:underline">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:underline">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#use-cases" className="hover:underline">
                    Use cases
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:underline">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Developers</h4>
              <ul className="space-y-2 text-sm text-base-content/70">
                <li>
                  <a href="/" className="hover:underline">
                    Docs
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:underline">
                    API
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:underline">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:underline">
                    System Status
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-base-content/70">
                <li>
                  <a href="/" className="hover:underline">
                    About
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:underline">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:underline">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter + Social */}
          <div className="space-y-4">
            <h4 className="font-semibold">Stay in the loop</h4>

            {/* Newsletter (static; replace with real handler when ready) */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3"
              aria-label="Subscribe to newsletter"
            >
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email address"
                className="input input-bordered w-full"
                required
              />
              <button
                type="submit"
                className="btn btn-primary"
                aria-label="Subscribe"
              >
                Subscribe
              </button>
            </form>

            <p className="text-sm text-base-content/70">
              Get product updates, tips, and community highlights once a month.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-2">
              <a 
                href="https://github.com/your-org"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="btn btn-ghost btn-sm"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/your-handle"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="btn btn-ghost btn-sm"
              >
                <X className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/your-company"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="btn btn-ghost btn-sm"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="/" aria-label="Website" className="btn btn-ghost btn-sm">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-10 border-t border-base-300 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-base-content/70">
            © {year} CodeMeet — Built for developers. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="/terms"
              className="text-sm text-base-content/70 hover:underline"
            >
              Terms
            </a>
            <a
              href="/privacy"
              className="text-sm text-base-content/70 hover:underline"
            >
              Privacy
            </a>
            <a
              href="/security"
              className="text-sm text-base-content/70 hover:underline"
            >
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
