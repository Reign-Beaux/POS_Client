import React from "react";
import { RoleProvider } from "./context";
import { RoleActionButtons, RoleDataGrid, RoleDialog, RoleDialogFeatures } from "./components";

export interface RolesProps {}

const Roles: React.FC<RolesProps> = () => {
  return (
    <RoleProvider>
      <RoleActionButtons />
      <RoleDataGrid />
      <RoleDialog />
      <RoleDialogFeatures />
    </RoleProvider>
  );
};

export default Roles;
