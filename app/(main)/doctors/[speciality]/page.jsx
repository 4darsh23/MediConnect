"use client";

import { useParams } from "next/navigation";
import React from "react";

export default function SpecialityPage() {
  const params = useParams();
  const speciality = params?.speciality ?? "";

  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold">Doctors — {decodeURIComponent(speciality)}</h1>
    </div>
  );
}
