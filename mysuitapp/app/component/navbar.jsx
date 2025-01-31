"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { name: "Men", path: "/men" },
  { name: "Women", path: "/women" },
  { name: "Accessories", path: "/accessories" },
  { name: "Collabs", path: "/collabs" },
];

const Navbar = () => {
  const pathname = usePathname(); // Get the current route

  return (
    <nav className="border-b border-gray-300">
      <div className="flex justify-center space-x-8 py-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`relative pb-2 text-gray-700 ${
              pathname === item.path ? "font-bold text-gray-900" : ""
            }`}
          >
            {item.name}
            {pathname === item.path && (
              <span className="absolute left-0 bottom-0 w-full h-1 bg-gray-700"></span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
