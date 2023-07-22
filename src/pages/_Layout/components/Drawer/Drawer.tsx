import { useAppSelector } from "@/redux";
import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Drawer as MaterialDrwawer,
  useTheme,
} from "@mui/material";
import { DRAWER_WIDTH } from "common/consts";
import { Feature } from "common/models";
import React from "react";
import { useChangeModule } from "./custom-hooks";
import { DrawerHeader, FeatureItem } from "./styled-components";
export interface DrawerProps {}

const Drawer: React.FC<DrawerProps> = () => {
  const theme = useTheme();
  const { selectedModule } = useAppSelector((store) => store.global);
  const { features } = useAppSelector((store) => store.session);
  const { changeModule } = useChangeModule();

  return (
    <MaterialDrwawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={true}
    >
      <DrawerHeader />
      <Divider />
      <List>
        {features.filter(feature => !feature.isChildren).map((page: Feature) => (
          <FeatureItem disablePadding key={page.id}>
            <ListItemButton
              onClick={() => changeModule(page.direction, page.id)}
              sx={
                selectedModule === page.id
                  ? { backgroundColor: theme.palette.background.default }
                  : {}
              }
            >
              <ListItemText primary={page.description} />
            </ListItemButton>
          </FeatureItem>
        ))}
      </List>
      <Divider />
    </MaterialDrwawer>
  );
};

export default Drawer;
