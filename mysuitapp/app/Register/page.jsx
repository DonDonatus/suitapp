import React from "react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex ">
      <div className="w-[40%] hidden lg:block">
        <Image
          src="/man1.jpg"
          width={500}
          height={50}
          alt="a man in suit"
          className="w-full h-[100vh] object-cover"
        />
      </div>
      <div className="register w-[100%] lg:w-[60%] flex flex-col items-center pt-[15%] px-4 bg-[#fafafa] ">
        <h1 className="text-4xl text-center font-bold font-sans text-gray-600">
          Sign up
        </h1>
        <p className="text-center text-sm mt-2 font-light text-gray-600">
          Enter details to sign up.
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
            type="Full Name"
            placeholder="Full Name"
            required
            aria-label="Full Name"
            className="w-[70%] p-2 mb-4 border border-black rounded-[5px] focus:outline-none focus:border-black"
          />
          <input
            type="password"
            placeholder="Password"
            required
            aria-label="Password"
            className="w-[70%] p-2 mb-4 border border-black rounded-[5px] focus:outline-none focus:border-black"
          />
          <input
            type="password"
            placeholder=" Confirm Password"
            required
            aria-label="Password"
            className="w-[70%] p-2 mb-4 border border-black rounded-[5px] focus:outline-none focus:border-black"
          />
          <div className="remember flex w-[70%]  h-10 justify-center items-center"></div>

          <button className="w-[70%] p-2.5 bg-[#2f5e7d] text-white rounded-lg hover:bg-gray-800 active:scale-95 transition-all my-1">
            Sign up
          </button>
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
