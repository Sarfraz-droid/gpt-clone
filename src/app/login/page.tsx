"use client";

import Logo from "@/assets/Logo";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function Page() {
  const { userId } = useAuth();

  if (userId) {
    redirect("/");
  }

  return (
    <div className="h-screen w-screen justify-center items-center flex flex-col">
      <div className="rounded-md p-4 flex flex-col justify-center items-center w-1/4 h-1/3 bg-gray-100">
        <div className="text-gray-800 flex">
          <Logo className="w-10 h-10 text-gray-800 p-2 rounded-md " />
          <div className="self-center">OpenAI</div>
        </div>
        <div className="text-black/40 text-xs mt-6 mb-2">Get Started</div>
        <SignedOut>
          <SignInButton>
            <button className="px-4 py-2 bg-gray-800 text-white rounded-lg w-full">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg w-full my-2 shadow-lg border border-black/20">
              Sign Up
            </button>
          </SignUpButton>
          {/* <SignUpButton  /> */}
        </SignedOut>
      </div>
    </div>
  );
}
