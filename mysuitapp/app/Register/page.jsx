"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  // State variables
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(password);
  const [borderColor, setBorderColor] = useState("border-black");
  const [hasTypedPassword, setHasTypedPassword] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setHasTypedPassword(true);
  };

  useEffect(() => {
    if (!hasTypedPassword) return; // Skip validation if user hasn't typed anything

    if (password.length > 8 && /[A-Z]/.test(password) && /\d/.test(password)) {
      setBorderColor("border-green-600");
      setError("");
      return;
    } else {
      setError(
        "Password must be at least 8 characters long.\n It must contain at least one uppercase and a number."
      );
      setBorderColor("border-red-600");
      setLoading(false);
    }
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error
    setSuccess(""); // Reset success message
    setLoading(true); // Show loading indicator

    const userData = {
      email,
      fullname,
      password,
    };

    if (!fullname || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // Send the request to create an account
      await axios.post("/api/users", userData);
      setFullname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Redirect to the verification page after 2 seconds
      setSuccess(
        "Account created successfully. Redirecting to verification page..."
      );
      router.push(`/Verification?email=${encodeURIComponent(email)}`);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="h-[65vh] lg:h-[70vh] w-full text-black bg-[#fafafa] flex items-end lg:items-start">
      <div className="w-[40%] hidden lg:block">
        <Image
          src="/man1.jpg"
          width={500}
          height={50}
          alt="a man in suit"
          className="w-full h-[100vh] object-cover"
        />
      </div>
      <div className="register w-[100%] lg:w-[60%] flex flex-col items-center pt-[15%] px-4 bg-[#fafafa]">
        <h1 className="text-4xl text-center font-bold font-sans text-gray-600">
          Sign up
        </h1>
        <p className="text-center text-sm mt-2 font-light text-gray-600">
          Enter details to sign up.
        </p>
        <form
          className="w-[80%] mt-4 flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            required
            className="w-[70%] p-2 mb-4 border border-black rounded-[5px] focus:outline-none focus:border-black"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-[70%] p-2 mb-4 border border-black rounded-[5px] focus:outline-none focus:border-black"
            onChange={(e) => setFullname(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className={`w-[70%] p-2 mb-4 border border-black rounded-[5px] focus:outline-none focus:${borderColor} ${borderColor}`}
            onChange={handlePasswordChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            className={`w-[70%] p-2 mb-4 border border-black rounded-[5px] focus:outline-none focus:border-black`}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="w-[70%] p-2.5 bg-[#2f5e7d] text-white rounded-lg hover:bg-gray-800 active:scale-95 transition-all my-1"
            type="submit"
          >
            {loading ? (
              <FontAwesomeIcon
                icon={faUserTie}
                className="mr-2 text-[#e7f1ff]"
                beatFade
              />
            ) : (
              "Sign Up"
            )}
          </button>
          {error && (
            <p
              className="text-red-500 whitespace-pre-line text-center"
              dangerouslySetInnerHTML={{ __html: error }}
            />
          )}

          {success && <p className="text-orange-600">{success}</p>}
        </form>
        <p className="text-gray-600 text-sm mt-2">
          Already have an account?{" "}
          <Link href="/" className="text-blue-600">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
