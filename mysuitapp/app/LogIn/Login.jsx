"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


const Login = () => {
  const router = useRouter();
  return (
    <div className="h-[65vh] lg:h-[70vh] w-full text-black bg-[#fafafa] flex   items-end lg:items-start  ">
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
        <p className="text-center text-sm mt-2 font-light text-gray-600 ">
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

          <button className="w-[70%] p-2 bg-[#4c6474] text-white rounded-lg hover:bg-gray-800 active:scale-95 transition-all my-2"onClick={
            () => {
              router.push("/homepage");
            }
            
          }>
            Sign in
          </button>
        </form>
        <p>Or</p>
        <button
          className="w-[56%] p-2 bg-[#afbdc600] text-black rounded-lg  active:scale-95 transition-all my-2 border border-black hover:bg-[#ad723fbc] hover:text-white"
          onClick={() => signIn("google")}
        >
          <FontAwesomeIcon icon={faGoogle} className="mr-2 text-[#ff4d00]" />
          Sign in with Google
        </button>

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
