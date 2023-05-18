import { POSTabPanel, POSTabs } from '@/common/components';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Articles, ArticlesTypes, InventoryDetail } from './components';
export interface InventoryProps {}

const Inventory : React.FC<InventoryProps> = () => {
	const [value, setValue] = useState<number>(0);

  const tabsName: string[] = ["Inventario", "Artículos", "Tipos de artículos"];

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <POSTabs value={value} setValue={setValue} tabsName={tabsName} />
      <POSTabPanel value={value} index={0}>
        <InventoryDetail />
      </POSTabPanel>
      <POSTabPanel value={value} index={1}>
        <Articles />
      </POSTabPanel>
      <POSTabPanel value={value} index={2}>
        <ArticlesTypes />
      </POSTabPanel>
    </Box>
  );
};

export default Inventory;
