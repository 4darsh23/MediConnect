// app/(main)/appointments/book/_components/booking-form.jsx
"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getAvailableTimeSlots, bookAppointment } from "@/actions/appointment";
import { Calendar, Clock, Loader2, CheckCircle2, MessageSquare, AlertTriangle, ShieldCheck } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export default function BookingForm({ doctor, patientCredits }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [days, setDays] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [slotsError, setSlotsError] = useState("");

  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [description, setDescription] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [successData, setSuccessData] = useState(null);

  // Fetch available slots on load
  useEffect(() => {
    async function loadSlots() {
      try {
        setLoadingSlots(true);
        const res = await getAvailableTimeSlots(doctor.id);
        setDays(res.days);
        // Default to first slot if available
        if (res.days?.[0]?.slots?.length > 0) {
          setSelectedSlot(res.days[0].slots[0]);
        }
      } catch (err) {
        setSlotsError(err.message || "Failed to load time slots");
      } finally {
        setLoadingSlots(false);
      }
    }
    loadSlots();
  }, [doctor.id]);

  // Handle day changes
  const handleDaySelect = (index) => {
    setSelectedDayIndex(index);
    setSelectedSlot(null); // Reset slot selection when day changes
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      toast.error("Please select a time slot");
      return;
    }

    setSubmitError("");
    
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("doctorId", doctor.id);
        formData.append("startTime", selectedSlot.startTime);
        formData.append("endTime", selectedSlot.endTime);
        formData.append("description", description);

        const res = await bookAppointment(formData);
        
        if (res.success) {
          toast.success("Appointment booked successfully!");
          setSuccessData({
            date: selectedSlot.day,
            time: selectedSlot.formatted,
            appointmentId: res.appointment.id
          });
        }
      } catch (err) {
        const msg = err.message || "Failed to book appointment";
        setSubmitError(msg);
        toast.error(msg);
      }
    });
  };

  // Render Success Screen
  if (successData) {
    return (
      <Card className="bg-card border-emerald-900/20 text-center py-12 px-6">
        <CardContent className="space-y-6">
          <div className="mx-auto w-16 h-16 bg-emerald-900/30 text-emerald-400 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold text-white">Appointment Confirmed!</CardTitle>
            <p className="text-muted-foreground text-lg">
              Your consultation has been successfully scheduled.
            </p>
          </div>

          <div className="max-w-md mx-auto p-6 bg-muted/20 border border-emerald-900/10 rounded-xl space-y-4 text-left">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border border-emerald-900/50">
                <AvatarImage src={doctor.imageUrl} alt={doctor.name} />
                <AvatarFallback>{doctor.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold text-white">{doctor.name}</h4>
                <p className="text-sm text-emerald-400">{doctor.specialty}</p>
              </div>
            </div>
            
            <div className="border-t border-emerald-900/20 pt-3 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-emerald-500" />
                <span>{successData.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-500" />
                <span>{successData.time}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <ShieldCheck className="h-4 w-4" />
                <span>2 Credits Deducted</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              variant="outline"
              onClick={() => router.push("/doctors")}
              className="border-emerald-900/30 text-white"
            >
              Book Another
            </Button>
            <Button
              onClick={() => router.push("/appointments")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              View My Appointments
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const hasEnoughCredits = patientCredits >= 2;
  const currentDay = days[selectedDayIndex];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT COLUMN: Booking Form */}
      <form onSubmit={onSubmit} className="lg:col-span-2 space-y-6">
        {/* Date Selector */}
        <Card className="border-emerald-900/20 bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-emerald-400" />
              1. Select a Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingSlots ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-2">
                <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
                <p className="text-sm text-muted-foreground">Checking available dates...</p>
              </div>
            ) : slotsError ? (
              <div className="p-4 bg-red-900/20 border border-red-700/30 rounded-lg text-center">
                <p className="text-red-400">Error: {slotsError}</p>
              </div>
            ) : days.length === 0 ? (
              <div className="p-4 bg-amber-900/10 border border-amber-800/20 rounded-lg text-center text-muted-foreground">
                This doctor hasn't set any availability.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {days.map((day, index) => {
                  const isSelected = selectedDayIndex === index;
                  const [dayOfWeek, monthDay] = day.displayDate.split(", ");
                  const hasSlots = day.slots?.length > 0;

                  return (
                    <button
                      key={day.date}
                      type="button"
                      disabled={!hasSlots}
                      onClick={() => handleDaySelect(index)}
                      className={`p-3 rounded-xl border flex flex-col items-center text-center transition-all cursor-pointer ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-950/20 shadow-[0_0_12px_rgba(16,185,129,0.15)] text-white"
                          : hasSlots
                          ? "border-emerald-900/20 bg-muted/20 hover:border-emerald-700/40 text-gray-300"
                          : "border-muted/20 bg-muted/5 opacity-40 cursor-not-allowed text-gray-500"
                      }`}
                    >
                      <span className="text-xs uppercase tracking-wider font-semibold opacity-70 mb-1">{dayOfWeek}</span>
                      <span className="text-lg font-bold">{monthDay || day.displayDate}</span>
                      <span className="text-xs mt-1 text-emerald-400/90 font-medium">
                        {hasSlots ? `${day.slots.length} slots` : "No slots"}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Time Slot Selector */}
        <Card className="border-emerald-900/20 bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-emerald-400" />
              2. Select a Time Slot
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingSlots ? (
              <div className="flex flex-col items-center justify-center py-6 space-y-2">
                <Loader2 className="h-6 w-6 text-emerald-500 animate-spin" />
                <p className="text-sm text-muted-foreground">Checking slots...</p>
              </div>
            ) : !currentDay || currentDay.slots?.length === 0 ? (
              <div className="p-6 bg-muted/20 border rounded-lg text-center text-muted-foreground text-sm">
                No time slots available for this day. Please select another date.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {currentDay.slots.map((slot) => {
                  const isSelected = selectedSlot?.startTime === slot.startTime;

                  return (
                    <button
                      key={slot.startTime}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all cursor-pointer text-center ${
                        isSelected
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white border-transparent shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                          : "bg-muted/20 border-emerald-900/10 hover:border-emerald-800/40 text-gray-200"
                      }`}
                    >
                      {slot.formatted.split(" - ")[0]} {/* Show start time only */}
                    </button>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Reason for Visit */}
        <Card className="border-emerald-900/20 bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-emerald-400" />
              3. Reason for Visit (Optional)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your symptoms, health concerns, or what you want to discuss with the doctor..."
              rows={4}
              className="border-emerald-900/30 focus-visible:ring-emerald-600 bg-muted/10 text-white placeholder-muted-foreground"
            />
          </CardContent>
        </Card>

        {/* Submit Error */}
        {submitError && (
          <div className="p-4 bg-red-900/20 border border-red-700/30 rounded-lg flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0" />
            <p className="text-sm text-red-400">{submitError}</p>
          </div>
        )}

        {/* Booking Button */}
        <Button
          type="submit"
          size="lg"
          disabled={isPending || loadingSlots || !selectedSlot || !hasEnoughCredits}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-md font-bold py-6 rounded-xl transition-all"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Booking Appointment...
            </>
          ) : !hasEnoughCredits ? (
            "Insufficient Credits"
          ) : (
            "Confirm Appointment (Cost: 2 Credits)"
          )}
        </Button>
      </form>

      {/* RIGHT COLUMN: Doctor Summary & Credits Info */}
      <div className="space-y-6">
        {/* Doctor Info Card */}
        <Card className="border-emerald-900/20 bg-card flex flex-col">
          <CardHeader className="flex flex-row items-center gap-4 pb-4">
            <Avatar className="h-14 w-14 border border-emerald-900/50">
              <AvatarImage src={doctor.imageUrl} alt={doctor.name} />
              <AvatarFallback className="bg-emerald-900/30 text-emerald-400 font-bold">
                {doctor.name?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg text-white">{doctor.name}</CardTitle>
              <Badge variant="outline" className="bg-emerald-900/20 border-emerald-700/30 text-emerald-400 mt-1">
                {doctor.specialty}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 border-t border-emerald-900/20 pt-4 flex-1">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-2 h-4 w-4 text-emerald-500" />
              {doctor.experience || 0} years experience
            </div>
            
            {doctor.description && (
              <div className="space-y-1 text-sm">
                <span className="font-semibold text-white">About Doctor:</span>
                <p className="text-muted-foreground leading-relaxed">{doctor.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Credits Balance Card */}
        <Card className="border-emerald-900/20 bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-md font-bold text-white">Booking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center text-sm py-2 border-b border-emerald-900/10">
              <span className="text-muted-foreground">Your Balance:</span>
              <span className={`font-bold ${hasEnoughCredits ? "text-emerald-400" : "text-red-400"}`}>
                {patientCredits} Credits
              </span>
            </div>
            
            <div className="flex justify-between items-center text-sm py-2 border-b border-emerald-900/10">
              <span className="text-muted-foreground">Booking Cost:</span>
              <span className="font-bold text-white">2 Credits</span>
            </div>

            {!hasEnoughCredits && (
              <div className="p-3 bg-red-900/20 border border-red-700/30 rounded-xl flex gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-400">
                  You do not have enough credits to book this appointment. Please go to <span className="font-bold underline cursor-pointer" onClick={() => router.push("/pricing")}>Pricing</span> to buy more credits.
                </p>
              </div>
            )}
            
            <div className="text-xs text-muted-foreground flex gap-2 pt-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500 flex-shrink-0" />
              <span>Each 30-minute consultation costs exactly 2 credits. Video session ID is securely generated upon confirmation.</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
