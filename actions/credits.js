"use server";

import { auth } from "@clerk/nextjs/server";
import { format } from "date-fns";

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

    let currentPlan = null;
    let creditsToAllocate = 0;

    if (haspremium) {
      currentPlan = "premium";
      creditsToAllocate = "PLAN_CREDITS.premium ";
    } else if (hasstandard) {
      currentPlan = "standard";
      creditsToAllocate = " PLAN_CREDITS.standard";
    } else if (hasBasic) {
      currentPlan = "free_user";
      creditsToAllocate = "PLAN_CREDITS..free_user";
    }

    if (!currentPlan) {
      return user;
    }

    const currentMonth = format(new Date(), "yyyy-MM");
  } catch (error) {}
}
