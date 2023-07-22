import { useAppSelector } from "@/redux";
import { parseJwt } from "@/utilities";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { POSDarkModeButton } from "common/components";
import React, { useEffect, useState } from "react";
import { useHeaderActions } from "./custom-hooks";
import { AppBar } from "./styled-components";
export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { token } = useAppSelector((store) => store.session);
  const { goHome, logOut } = useHeaderActions();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const userClaim = parseJwt(token);
    setUserName(userClaim.FullName);
  }, []);

  return (
    <AppBar position="fixed" open={true}>
      <Toolbar>
        {/* <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpendrawer(!openDrawer)}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: "5px" }}>
          <span style={{ color: "white", cursor: "pointer" }} onClick={goHome}>
            Punto de ventas
          </span>
        </Typography>
        <Typography variant="h6" component="div" style={{ color: "white" }}>
          {userName}
        </Typography>
        <POSDarkModeButton style={{ color: "white" }} />
        <Tooltip title="Cerrar sesión">
          <IconButton aria-label="logOut" style={{ color: "white" }} onClick={logOut}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
