"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";

const Header = () => {
  const { user } = useUser();

  return (
    <header className="fixed top-0 w-full border-b border-zinc-200 bg-background/80 backdrop-blur-md z-10 supports-[backdrop-filter]:bg-background/60 dark:border-zinc-800">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo-single.png"
            alt="Mediconnect Logo"
            width={100}
            height={60}
            className=" h-10 w-auto object-contain  "
          />
        </Link>

        <div className=" flex items-center space-x-2">
          <SignedOut>
            <SignInButton>
              <Button variant="secondary"> sign in </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
