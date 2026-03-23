"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

// define credit allocation per subscription plan
const PLAN_CREDITS = {
  free_user: 0,
  standard: 0,
  premium: 24,
};

export async function checkAndAllocateCredits(user) {
  try {
    // Only operate for valid patient users
    if (!user) return null;
    if (user.role !== "PATIENT") return user;

    // Determine the user's current plan
    let currentPlan = "free_user";
    const clerkUser = await currentUser();
    const planFromClerk = clerkUser?.publicMetadata?.plan;
    if (typeof planFromClerk === "string" && PLAN_CREDITS.hasOwnProperty(planFromClerk)) {
      currentPlan = planFromClerk;
    } else if (user?.transactions?.[0]?.packageId && PLAN_CREDITS.hasOwnProperty(user.transactions[0].packageId)) {
      currentPlan = user.transactions[0].packageId;
    }

    const creditsToAllocate = PLAN_CREDITS[currentPlan] ?? 0;
    if (creditsToAllocate <= 0) return user;

    // Check if a purchase for this plan already exists this month
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const existingThisMonth = await db.creditTransaction.findFirst({
      where: {
        userId: user.id,
        type: "CREDIT_PURCHASE",
        packageId: currentPlan,
        createdAt: { gte: startOfMonth },
      },
      orderBy: { createdAt: "desc" },
    });

    if (existingThisMonth) return user;

    // Allocate credits and record transaction atomically
    const updatedUser = await db.$transaction(async (tx) => {
      await tx.creditTransaction.create({
        data: {
          userId: user.id,
          amount: creditsToAllocate,
          type: "CREDIT_PURCHASE",
          packageId: currentPlan,
        },
      });

      return tx.user.update({
        where: { id: user.id },
        data: {
          credits: { increment: creditsToAllocate },
        },
        include: {
          transactions: {
            where: { type: "CREDIT_PURCHASE" },
            orderBy: { createdAt: "desc" },
            take: 1,
          },
        },
      });
    });

    return updatedUser;
  } catch (error) {
    console.error("Failed to check subscription and allocate credits", error.message);
    return null;
  }
}

// Deduct credits when a patient books an appointment and credit the doctor
export async function deductCreditsForAppointment(patientId, doctorId) {
  try {
    await db.$transaction(async (tx) => {
      // Create credit transaction for patient (usage)
      await tx.creditTransaction.create({
        data: {
          userId: patientId,
          amount: -2,
          type: "APPOINTMENT_DEDUCTION",
        },
      });

      // Create credit transaction for doctor (earning)
      await tx.creditTransaction.create({
        data: {
          userId: doctorId,
          amount: 2,
          type: "APPOINTMENT_DEDUCTION",
        },
      });

      // Update patient's credit balance (decrement)
      await tx.user.update({
        where: { id: patientId },
        data: {
          credits: {
            decrement: 2,
          },
        },
      });

      // Update doctor's credit balance (increment)
      await tx.user.update({
        where: { id: doctorId },
        data: {
          credits: {
            increment: 2,
          },
        },
      });
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to deduct credits for appointment", error);
    return { success: false, error: error.message || "Failed to deduct credits" };
  }
}

