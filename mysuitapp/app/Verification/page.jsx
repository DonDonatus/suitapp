"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const CodeVerification = () => {
  const [code, setCode] = useState(Array(6).fill("")); // 6 code boxes
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(30);
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
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
    const verificationCode = code.join(""); // Combine code characters

    try {
      const response = await axios.post(`/api/verification?email=${email}`, {
        code: verificationCode, // Send code in body
      });
      setSuccessMessage(response.data.message);
      setErrorMessage("");
      console.log("Verification successful:", response.data.message);
      // Additional success handling (e.g., redirect) can go here
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
        setSuccessMessage("");
        console.log("Verification failed:", error.response.data.message);
      } else {
        setErrorMessage("Server error, please try again later.");
        setSuccessMessage("");
      }
    }
  };

  const handleResend = () => {
    setResendDisabled(true);
    console.log("Resending code...");
    // Add API call to resend code if needed.
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-gray-900 to-black text-white">
      <motion.h1
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-wide text-gold-400 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Let's get you Suited Up!
      </motion.h1>
      <motion.p
        className="text-base sm:text-lg md:text-xl mt-2 mb-6 opacity-80 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Enter the code sent to <strong>{email}</strong>
      </motion.p>

      {/* Error message */}
      {errorMessage && (
        <div className="text-red-500 mt-4 text-center">{errorMessage}</div>
      )}
      {/* Success message */}
      {successMessage && (
        <div className="text-green-500 mt-4 text-center">{successMessage}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex space-x-2 sm:space-x-3 mb-4"
      >
        {code.map((digit, index) => (
          <motion.input
            key={index}
            id={`input-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            maxLength={1}
            className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 text-center text-lg sm:text-xl font-bold border border-gray-600 rounded-lg bg-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-gold-400 transition-all"
            whileHover={{ scale: 1.1 }}
          />
        ))}
      </form>
      <button
        onClick={handleSubmit}
        className="mt-2 sm:mt-4 px-4 sm:px-6 py-2 text-base sm:text-lg font-semibold bg-gold-500 text-yellow-200 rounded-lg hover:bg-gold-600 active:scale-95 transition border-2 border-purple-500"
      >
        Verify Code
      </button>
      <button
        onClick={handleResend}
        className="mt-2 sm:mt-4 text-sm sm:text-base text-gray-400 hover:text-gold-300 disabled:opacity-50"
        disabled={resendDisabled}
      >
        {resendDisabled ? `Resend in ${timer}s` : "Resend Code"}
      </button>
    </div>
  );
};

export default CodeVerification;
