import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./POSTabs.css";

export interface POSTabsProps {
  value: number;
  setValue: Function;
  tabsName: string[];
}

const POSTabs: React.FC<POSTabsProps> = ({ value, setValue, tabsName }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        textColor="secondary"
        indicatorColor="secondary"
      >
        {tabsName.map((tab, index) => (
          <Tab key={index} id={`${index}`} label={tab} />
        ))}
      </Tabs>
    </Box>
  );
};

export default POSTabs;
