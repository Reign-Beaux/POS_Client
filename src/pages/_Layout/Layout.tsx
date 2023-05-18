import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { Drawer, Header } from "./components";
import { DrawerHeader } from "./components/Drawer/styled-components";
import { FeatureContainer, Main } from "./styled-components";
export interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Header />
        <Drawer />
        <Main open={true}>
          <DrawerHeader />
          <FeatureContainer>
            <Outlet />
          </FeatureContainer>
        </Main>
      </Box>
    </>
  );
};

export default Layout;
