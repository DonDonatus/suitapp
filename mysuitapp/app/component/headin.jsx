"use client";
import { Bell, Search, ShoppingCart } from "lucide-react"; // Icons
import Image from "next/image";

export default function headin() {
  return (
    <header>
      {/* Announcement Bar */}
      <div className="bg-gray-800 text-white py-2 text-center text-sm">
        Announcements here
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-gray-100 border-b border-gray-300">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <Bell className="w-5 h-5 text-gray-600" />
            <Search className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-500">Search</span>
          </div>

          {/* Center Section */}
          <div className="text-2xl font-bold text-gray-700 tracking-widest">
            FIRSTYOK SUITS
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Flag */}
            <Image
              src="/us-flag.png" // Replace with your flag image URL
              alt="US Flag"
              width={20}
              height={15}
              className="rounded-sm"
            />
            <span className="text-sm text-gray-500">US</span>

            {/* Account */}
            <span className="text-sm text-gray-500">Account</span>

            {/* Cart */}
            <ShoppingCart className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </div>
    </header>
  );
}
