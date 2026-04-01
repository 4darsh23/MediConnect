"use client";

import { TabsContent } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Loader2,
  Clock,
  ExternalLink,
  UserX,
  UserCheck,
} from "lucide-react";
import {
  getPendingDoctors,
  getVerifiedDoctors,
  updateDoctorStatus,
  updateDoctorActiveStatus,
} from "@/actions/admin";
import useFetch from "@/hooks/use-fetch";

function DoctorCard({ doctor, type }) {
  const {
    loading: approveLoading,
    fn: approveDoctor,
    data: approveData,
  } = useFetch(updateDoctorStatus);

  const {
    loading: rejectLoading,
    fn: rejectDoctor,
    data: rejectData,
  } = useFetch(updateDoctorStatus);

  const {
    loading: suspendLoading,
    fn: toggleSuspend,
    data: suspendData,
  } = useFetch(updateDoctorActiveStatus);

  const [actioned, setActioned] = useState(false);

  useEffect(() => {
    if (approveData?.success || rejectData?.success || suspendData?.success) {
      setActioned(true);
    }
  }, [approveData, rejectData, suspendData]);

  if (actioned) return null;

  const handleApprove = async () => {
    const formData = new FormData();
    formData.append("doctorId", doctor.id);
    formData.append("status", "VERIFIED");
    await approveDoctor(formData);
  };

  const handleReject = async () => {
    const formData = new FormData();
    formData.append("doctorId", doctor.id);
    formData.append("status", "REJECTED");
    await rejectDoctor(formData);
  };

  const handleSuspend = async () => {
    const formData = new FormData();
    formData.append("doctorId", doctor.id);
    formData.append("suspend", "true");
    await toggleSuspend(formData);
  };

  return (
    <Card className="border-emerald-900/20 hover:border-emerald-700/30 transition-all">
      <CardContent className="pt-5 pb-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {doctor.imageUrl ? (
              <img
                src={doctor.imageUrl}
                alt={doctor.name}
                className="h-12 w-12 rounded-full object-cover border-2 border-emerald-900/30"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-emerald-900/30 flex items-center justify-center text-emerald-400 font-semibold text-lg">
                {doctor.name?.charAt(0) || "D"}
              </div>
            )}
            <div>
              <h3 className="font-semibold text-white text-sm">
                {doctor.name || "Unknown"}
              </h3>
              <p className="text-xs text-muted-foreground">{doctor.email}</p>
            </div>
          </div>

          {type === "pending" && (
            <Badge
              variant="outline"
              className="border-yellow-500/30 text-yellow-400 text-xs"
            >
              <Clock className="h-3 w-3 mr-1" />
              Pending
            </Badge>
          )}

          {type === "verified" && (
            <Badge
              variant="outline"
              className="border-emerald-500/30 text-emerald-400 text-xs"
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>

        {/* Doctor Details */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">Specialty:</span>
            <p className="text-white font-medium">
              {doctor.specialty || "Not specified"}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Experience:</span>
            <p className="text-white font-medium">
              {doctor.experience
                ? `${doctor.experience} years`
                : "Not specified"}
            </p>
          </div>
        </div>

        {doctor.description && (
          <div className="mt-3">
            <span className="text-muted-foreground text-sm">Description:</span>
            <p className="text-white/80 text-sm mt-1 line-clamp-2">
              {doctor.description}
            </p>
          </div>
        )}

        {doctor.credentialUrl && (
          <a
            href={doctor.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View Credentials
          </a>
        )}

        {/* Action Buttons */}
        <div className="mt-4 flex gap-2">
          {type === "pending" && (
            <>
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 flex-1"
                onClick={handleApprove}
                disabled={approveLoading || rejectLoading}
              >
                {approveLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                ) : (
                  <CheckCircle className="h-4 w-4 mr-1" />
                )}
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="flex-1"
                onClick={handleReject}
                disabled={approveLoading || rejectLoading}
              >
                {rejectLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                ) : (
                  <XCircle className="h-4 w-4 mr-1" />
                )}
                Reject
              </Button>
            </>
          )}

          {type === "verified" && (
            <Button
              size="sm"
              variant="outline"
              className="border-red-900/30 text-red-400 hover:bg-red-900/20 hover:text-red-300"
              onClick={handleSuspend}
              disabled={suspendLoading}
            >
              {suspendLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
              ) : (
                <UserX className="h-4 w-4 mr-1" />
              )}
              Suspend
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function PendingDoctorsTab() {
  const { loading, data, fn: fetchPending } = useFetch(getPendingDoctors);

  useEffect(() => {
    fetchPending();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-400" />
        <span className="ml-2 text-muted-foreground">
          Loading pending doctors...
        </span>
      </div>
    );
  }

  const doctors = data?.doctors || [];

  if (doctors.length === 0) {
    return (
      <div className="text-center py-12">
        <UserCheck className="h-12 w-12 text-emerald-400/30 mx-auto mb-3" />
        <p className="text-muted-foreground">
          No pending verification requests
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {doctors.length} doctor{doctors.length !== 1 ? "s" : ""} awaiting
        verification
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} type="pending" />
        ))}
      </div>
    </div>
  );
}

function VerifiedDoctorsTab() {
  const { loading, data, fn: fetchVerified } = useFetch(getVerifiedDoctors);

  useEffect(() => {
    fetchVerified();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-400" />
        <span className="ml-2 text-muted-foreground">
          Loading verified doctors...
        </span>
      </div>
    );
  }

  const doctors = data?.doctors || [];

  if (doctors.length === 0) {
    return (
      <div className="text-center py-12">
        <UserX className="h-12 w-12 text-emerald-400/30 mx-auto mb-3" />
        <p className="text-muted-foreground">No verified doctors yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {doctors.length} verified doctor{doctors.length !== 1 ? "s" : ""}
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} type="verified" />
        ))}
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <>
      <TabsContent value="pending" className="border-none p-0 mt-0">
        <PendingDoctorsTab />
      </TabsContent>
      <TabsContent value="doctors" className="border-none p-0 mt-0">
        <VerifiedDoctorsTab />
      </TabsContent>
      <TabsContent value="payouts" className="border-none p-0 mt-0">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Payouts management coming soon</p>
        </div>
      </TabsContent>
    </>
  );
}
