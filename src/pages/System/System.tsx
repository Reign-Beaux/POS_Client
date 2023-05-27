import { POSTabs } from "common/components";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Areas, Employess, Roles, Users } from "./components";
import { POSTabPanel } from "common/components/POSTabPanel";
export interface SystemProps {}

const System: React.FC<SystemProps> = () => {
  const [value, setValue] = useState<number>(0);

  const tabsName: string[] = ["Empleado", "Áreas", "Usuarios", "Roles"];

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <POSTabs value={value} setValue={setValue} tabsName={tabsName} />
      <POSTabPanel value={value} index={0}>
        <Employess />
      </POSTabPanel>
      <POSTabPanel value={value} index={1}>
        <Areas />
      </POSTabPanel>
      <POSTabPanel value={value} index={2}>
        <Users />
      </POSTabPanel>
      <POSTabPanel value={value} index={3}>
        <Roles />
      </POSTabPanel>
    </Box>
  );
};

export default System;
