import Link from "next/link";
import { SpectrumLogo } from "./ui/spectrum-logo";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Copyright */}
          <div className="space-y-4">
            <SpectrumLogo />
            <p className="text-gray-500 text-sm">
              Building a clearer, more intentional world.
            </p>
            <p className="text-gray-400 text-xs">
              © {new Date().getFullYear()} Spectrum AI, Inc. All rights reserved.
            </p>
          </div>

          {/* Feature Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Features</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/career-events" className="text-base text-gray-500 hover:text-gray-900">
                  Career Events
                </Link>
              </li>
              <li>
                <Link href="/timeline" className="text-base text-gray-500 hover:text-gray-900">
                  Timeline View
                </Link>
              </li>
              <li>
                <Link href="/pathfinder" className="text-base text-gray-500 hover:text-gray-900">
                  Goal Pathfinder
                </Link>
              </li>
              <li>
                <span className="text-base text-gray-400 cursor-not-allowed">
                  Portfolio Builder (Soon)
                </span>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900">About</a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900">Careers</a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900">Contact</a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Connect</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="https://linkedin.com/in/ayousuf" target="_blank" rel="noopener noreferrer" className="text-base text-gray-500 hover:text-gray-900">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                  YouTube
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
