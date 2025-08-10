"use server";

import { auth } from "@clerk/nextjs/server";
import { UserRoundIcon } from "lucide-react";

export async function setUserRole(formData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }
  // finding the user in our database

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found in the database");

  const role = formData.get("role");

  if (!role || ["PATIENT", "DOCTOR"].includes(role)) {
    throw new Error("Invalid role selection");
  }
}
