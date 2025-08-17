import Link from "next/link";
import { SpectrumLogo } from "./ui/spectrum-logo";
import SessionInfo from "~/app/SessionInfo";

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            {/* TODO: Replace with the new logo when a direct image URL is available */}
            <Link href="/" className="flex items-center space-x-2">
              <SpectrumLogo className="h-8 w-auto" />
              <span className="text-2xl font-semibold text-gray-800">SpectrumAI</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex md:space-x-8">
            <Link href="/timeline" className="text-lg font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Timeline
            </Link>
            <Link href="/pathfinder" className="text-lg font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Pathfinder
            </Link>
            <Link href="/career-events" className="text-lg font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Events
            </Link>
          </nav>

          {/* Session Info (Login/Logout) */}
          <div className="flex items-center">
            <SessionInfo />
          </div>
        </div>
      </div>
    </header>
  );
}
