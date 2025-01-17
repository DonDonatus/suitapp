"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  return (
    <div className="h-[100vh] w-full text-black bg-[#fafafa] flex">
      {/* Image container */}
      <div className="w-[40%] hidden lg:block">
        <Image
          src="/bibinii.jpg"
          width={500}
          height={50}
          alt="a man in suit"
          className="w-full h-[100vh] object-cover"
        />
      </div>
      {/* Register container */}
      <div className="register w-[100%] lg:w-[60%] flex flex-col items-center pt-[15%] px-4">
        <h1 className="text-3xl text-center font-bold font-sans text-gray-800">
          Sign in
        </h1>
        <p className="text-center text-sm mt-2 font-light text-gray-600">
          Enter email and password to sign in.
        </p>
        <form className="w-[80%] mt-4 flex flex-col items-center">
          <input
            type="Email"
            placeholder="Email"
            required
            aria-label="Email"
            className="w-[70%] p-2 mb-4 border border-black rounded-[5px] focus:outline-none focus:border-black"
          />
          <input
            type="password"
            placeholder="Password"
            required
            aria-label="Password"
            className="w-[70%] p-2 mb-4 border border-black rounded-[5px] focus:outline-none focus:border-black"
          />
          <div className="remember flex w-[70%]  h-10 justify-center items-center">
            <input
              type="checkbox"
              name="Remember me"
              id="Remember"
              className="h-7 w-7 border border-black rounded-[5px] focus:outline-none focus:border-black mr-3 cursor-pointer"
            />
            <p className="w-full text-gray-600 font-thin text-sm my-2">
              Remember me?
            </p>
          </div>

          <button className="w-[70%] p-2 bg-[#4c6474] text-white rounded-lg hover:bg-gray-800 active:scale-95 transition-all my-2">
            Sign in
          </button>
        </form>
        <p className="text-gray-600 text-sm mt-2">
          Don't have an account?{" "}
          <Link href="../Register" className="text-blue-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
