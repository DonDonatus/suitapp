"use client";
import React, { useEffect } from "react";
import axios from "axios";

const page = () => {
  async function checkUserStatus() {
    try {
      const response = await axios.get("/api/LoggedStatus", {
        withCredentials: true,
      });
      console.log("User status:", response.data);
    } catch (error) {
      console.log("Error checking status:", error);
      window.location.href = "/";
    }
  }

  useEffect(() => {
    checkUserStatus();
  }, []);

  return <div className="text-black">Homepage</div>;
};

export default page;
