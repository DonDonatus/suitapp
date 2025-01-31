"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const CodeVerification = () => {
  const [code, setCode] = useState(Array(6).fill("")); // Updated to 6 boxes
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(30);
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const [successMessage, setSuccessMessage] = useState(""); // State to store success message
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    if (resendDisabled) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setResendDisabled(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [resendDisabled]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    const newCode = [...code];
    newCode[index] = value;
    if (value.length === 1 && index < 5) {
      document.getElementById(`input-${index + 1}`).focus();
    }
    setCode(newCode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join(""); // Join the array of characters to form the code

    try {
      const response = await axios.post(`/api/verification?email=${email}`, {
        code: verificationCode, // Send code in the body
      });

      setSuccessMessage(response.data.message); // Show success message
      setErrorMessage(""); // Clear any previous error message
      console.log("Verification successful:", response.data.message);
      // Handle success (e.g., redirect user or show success message)
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message); // Display error message from backend
        setSuccessMessage(""); // Clear success message
        console.log("Verification failed:", error.response.data.message);
      } else {
        setErrorMessage("Server error, please try again later."); // Generic server error message
        setSuccessMessage(""); // Clear success message
      }
    }
  };

  const handleResend = () => {
    setResendDisabled(true);
    console.log("Resending code...");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <motion.h1
        className="text-4xl font-extrabold tracking-wide text-gold-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Lets get you Suited Up!
      </motion.h1>
      <motion.p
        className="text-lg mt-2 mb-6 opacity-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Enter the code sent to <strong>{email}</strong>
      </motion.p>

      {/* Display error message if there's an error */}
      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}

      {/* Display success message if verification is successful */}
      {successMessage && (
        <div className="text-green-500 mt-4">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit} className="flex space-x-3">
        {code.map((digit, index) => (
          <motion.input
            key={index}
            id={`input-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            maxLength={1}
            className="w-14 h-14 text-center text-xl font-bold border border-gray-600 rounded-lg bg-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
            whileHover={{ scale: 1.1 }}
          />
        ))}
      </form>
      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-2 text-lg font-semibold bg-gold-500 text-white rounded-lg hover:bg-gold-600 active:scale-95 transition border-2 border-purple-500"
      >
        Verify Code
      </button>
      <button
        onClick={handleResend}
        className="mt-4 text-sm text-gray-400 hover:text-gold-300 disabled:opacity-50"
        disabled={resendDisabled}
      >
        {resendDisabled ? `Resend in ${timer}s` : "Resend Code"}
      </button>
    </div>
  );
};

export default CodeVerification;
