// MediConnect/mediconnect/lib/checkUser.js

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

/**
 * Ensures there is a corresponding User row in Postgres
 * for the currently authenticated Clerk user.
 *
 * - If the user exists, returns it.
 * - If not, creates a new UNASSIGNED user with 2 free credits.
 */
export const checkUser = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
      include: {
        transactions: {
          where: {
            type: "CREDIT_PURCHASE",
            createdAt: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    const name =
      `${user.firstName || ""} ${user.lastName || ""}`.trim() || null;

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0]?.emailAddress || "",
        // role defaults to UNASSIGNED
        transactions: {
          create: {
            type: "CREDIT_PURCHASE",
            packageId: "free_user",
            amount: 2,
          },
        },
      },
    });

    return newUser;
  } catch (error) {
    console.error("checkUser failed:", error);
    return null;
  }
};
