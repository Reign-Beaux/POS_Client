import React from 'react';

export type POSTabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const POSTabPanel: React.FC<POSTabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <>{children}</>}
    </div>
  );
};

export default POSTabPanel;
