"use client";

import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const auth = useAuth();

  if (auth.isSignedIn) redirect("/c");
  else redirect("/login");
}
