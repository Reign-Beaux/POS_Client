import React from "react";
import { AreaActionButtons, AreaDataGrid, AreaDialog } from "./components";
import { AreaProvider } from "./context";

export interface AreasProps {}

const Areas: React.FC<AreasProps> = () => {
  return (
    <AreaProvider>
      <AreaActionButtons />
			<AreaDataGrid />
      <AreaDialog />
    </AreaProvider>
  );
};

export default Areas;
