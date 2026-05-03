import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock, ChevronLeft } from "lucide-react";
import { getDoctorsBySpecialty } from "@/actions/doctors-listing";

export default async function SpecialtyDoctorsPage({ params }) {
  // Extract and format the specialty from URL
  const { speciality } = await params;
  const specialtyName = decodeURIComponent(speciality);

  const { doctors, error } = await getDoctorsBySpecialty(speciality);

  return (
    <>
      <div className="mb-6">
        <Button variant="ghost" asChild className="pl-0 text-muted-foreground hover:text-white">
          <Link href="/doctors">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Specialties
          </Link>
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          <span className="text-emerald-400">{specialtyName}</span> Specialists
        </h1>
        <p className="text-muted-foreground text-lg">
          Book an appointment with our highly qualified {specialtyName.toLowerCase()} doctors
        </p>
      </div>

      {error ? (
        <div className="p-4 bg-red-900/20 border border-red-700/30 rounded-lg text-center">
          <p className="text-red-400">Error: {error}</p>
        </div>
      ) : !doctors || doctors.length === 0 ? (
        <div className="text-center py-16 bg-muted/10 rounded-xl border border-muted/20">
          <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No Doctors Found</h3>
          <p className="text-muted-foreground">
            We currently don't have any verified {specialtyName.toLowerCase()} doctors available.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="bg-card border-emerald-900/20 flex flex-col h-full">
              <CardHeader className="flex flex-row items-start gap-4 pb-4">
                <Avatar className="h-16 w-16 border-2 border-emerald-900/50">
                  <AvatarImage src={doctor.imageUrl} alt={doctor.name} />
                  <AvatarFallback className="bg-emerald-900/30 text-emerald-400 font-bold">
                    {doctor.name?.substring(0, 2).toUpperCase() || "DR"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl text-white">{doctor.name}</CardTitle>
                  <Badge variant="outline" className="bg-emerald-900/20 border-emerald-700/30 text-emerald-400 mt-1">
                    {doctor.specialty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4 text-emerald-500" />
                  {doctor.experience || 0} years experience
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {doctor.description || "No description provided."}
                </p>
              </CardContent>
              <CardFooter className="pt-4 border-t border-emerald-900/20">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                  <Link href={`/appointments/book?doctorId=${doctor.id}`}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Appointment
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
