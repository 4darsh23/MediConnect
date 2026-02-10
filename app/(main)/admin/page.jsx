import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";

const AdminPage = async () => {
  const [pendingDoctors, verifiedDoctors] = await Promise.all([getPendingDoctors(), getVerifiedDoctors()]);

  return (
    <div>
      <TabsContent
        value="pending"
        className="border-none p-0 "
      >
        Pending
      </TabsContent>
      <TabsContent
        value="doctors"
        className="border-none p-0 "
      >
        Doctors{" "}
      </TabsContent>
    </div>
  );
};

export default AdminPage;
