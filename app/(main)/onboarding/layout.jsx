"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function OnboardingLayout({ children }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      // Check if user has completed onboarding by looking at public metadata
      const userRole = user.publicMetadata?.role;

      if (userRole === "PATIENT") {
        router.push("/doctors");
      } else if (userRole === "DOCTOR") {
        router.push("/doctor");
      }
    }
  }, [user, isLoaded, router]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return <div>{children}</div>;
}
