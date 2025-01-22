import React from "react";
import Login from "./LogIn/Login";
// Import the Font Awesome core
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
config.autoAddCss = false; // Prevents Font Awesome from adding its own CSS

const page = () => {
  return (
    <div className="h-[100vh] w-full bg-[#fafafa] text-black ">
      <Login />
    </div>
  );
};

export default page;
