// Specialty catalog for the /doctors/[speciality] page.
// NOTE: file name is intentionally `specialities.js` to match the import path in that route.

import { HeartPulse, Stethoscope, Brain, Eye, Bone, Baby, ShieldCheck } from "lucide-react";

export const SPECIALTIES = [
  { name: "General Medicine", icon: <Stethoscope className="h-5 w-5" /> },
  { name: "Cardiology", icon: <HeartPulse className="h-5 w-5" /> },
  { name: "Neurology", icon: <Brain className="h-5 w-5" /> },
  { name: "Ophthalmology", icon: <Eye className="h-5 w-5" /> },
  { name: "Orthopedics", icon: <Bone className="h-5 w-5" /> },
  { name: "Pediatrics", icon: <Baby className="h-5 w-5" /> },
  { name: "Preventive Care", icon: <ShieldCheck className="h-5 w-5" /> },
];

