// app/(main)/appointments/book/page.jsx
import { getDoctorById } from "@/actions/appointment";
import { getCurrentUser } from "@/actions/onboarding";
import { redirect } from "next/navigation";
import BookingForm from "./_components/booking-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function BookAppointmentPage({ searchParams }) {
  const { doctorId } = await searchParams;
  const user = await getCurrentUser();

  // Route protection - must be logged in as a patient to book
  if (!user || user.role !== "PATIENT") {
    redirect("/onboarding");
  }

  if (!doctorId) {
    redirect("/doctors");
  }

  let doctor = null;
  try {
    const result = await getDoctorById(doctorId);
    doctor = result.doctor;
  } catch (error) {
    console.error("Failed to get doctor details:", error);
    redirect("/doctors");
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          asChild
          className="pl-0 text-muted-foreground hover:text-white"
        >
          <Link href="/doctors">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Doctors
          </Link>
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Book Your Consultation</h1>
        <p className="text-muted-foreground text-lg">Select a convenient date and time to schedule your video visit.</p>
      </div>

      <BookingForm doctor={doctor} patientCredits={user.credits} />
    </div>
  );
}
