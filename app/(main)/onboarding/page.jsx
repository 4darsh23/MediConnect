"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const doctoFormSchema = z.object({});

const OnboardingPage = () => {
  const [step, setStep] = useState("choose-role");

  const {} = useForm({
    resolver: zodResolver(doctoFormSchema),
  });

  return <div> Onboarding Page</div>;
};

export default OnboardingPage;
