import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";

const AdminPage = () => {
  return (
    <div>
      <TabsContent value="account">Make changes to your account here.</TabsContent>
      <TabsContent value="password">Change your password here. </TabsContent>
    </div>
  );
};

export default AdminPage;
