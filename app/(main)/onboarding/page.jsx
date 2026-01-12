"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Description } from "@radix-ui/react-dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const doctoFormSchema = z.object({
  speciality: z.string().min(1, "speciality is required"),
  experience: z.number().min(1, "experience must be at least 1 year").max(70, "Experience must be less than 70 years"),

  CredentialUrl: z.string().url("Please enter a valid URL").min(1, "Credential URL is required"),
  Description: z.string().min(20, "Description must be at least 20 characters").max(1000, "  Description cannot be more than 1000 characters"),
});

const OnboardingPage = () => {
  const [step, setStep] = useState("choose-role");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(doctoFormSchema),
    defaultValues: {
      speciality: "",
      experience: undefined,
      credentialUrl: "",
      description: "",
    },
  });

  if (step === "choose-role") {
    return (
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  }
  if (step === "doctor-form") {
    return <>Doctor Form </>;
  }
};

export default OnboardingPage;
