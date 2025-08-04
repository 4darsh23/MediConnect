"use server";

import { auth } from "@clerk/nextjs/server";

// define credit allocation

const PLAN_CREDITS = {
  free_user: 0,
  standard: 0,
  premium: 24,
};

const APPOINTMENT_CREDIT_COST = 2;

export async function checkAndAllocateCredits(user) {
  try {
    if (!user) {
      return null;
    }

    if (user.role !== "PATIENT") {
      return user;
    }

    const { has } = await auth();

    const hasBasic = has({ plan: "free_user" });
    const hasstandard = has({ plan: "standard" });
    const haspremium = has({ plan: "premium" });
  } catch (error) {}
}
