'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/30 shadow-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 transform transition-transform duration-200 hover:scale-105"
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 shadow-md">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold text-gray-900">
              School Directory
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-3">
            <Link
              href="/addSchool"
              className={`px-5 py-2 rounded-full font-medium transition-all duration-200 transform ${
                isActive("/addSchool")
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white scale-105 shadow-xl"
                  : "bg-white/50 text-gray-900 hover:bg-white/70 hover:scale-105"
              }`}
            >
              Add School
            </Link>

            <Link
              href="/showSchools"
              className={`px-5 py-2 rounded-full font-medium transition-all duration-200 transform ${
                isActive("/showSchools")
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white scale-105 shadow-xl"
                  : "bg-white/50 text-gray-900 hover:bg-white/70 hover:scale-105"
              }`}
            >
              View Schools
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
