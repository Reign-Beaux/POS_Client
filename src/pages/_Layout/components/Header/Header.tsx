import { POSReducer } from "@/redux";
import { logoutSession, setSelectedModule } from "@/redux/slices";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { POSDarkModeButton } from "common/components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppBar } from "./styled-components";
import { parseJwt } from "@/utilities";
export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((store: POSReducer) => store.session);
  const [userName, setUserName] = useState<string>("");

  const handleClick = () => {
    dispatcher(setSelectedModule(0));
    navigate("/");
  }

  const handleLogOut = () => {
    dispatcher(setSelectedModule(0));
    dispatcher(logoutSession());
  };

  useEffect(() => {
    const userClaim = parseJwt(token);
    setUserName(userClaim.FullName)
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
          <span style={{ color: "white", cursor: "pointer" }} onClick={handleClick}>
            Punto de ventas
          </span>
        </Typography>
        <Typography variant="h6" component="div"  style={{ color: "white"}}>
          {userName}
        </Typography>
        <POSDarkModeButton style={{ color: "white" }} />
        <Tooltip title="Cerrar sesión">
          <IconButton aria-label="logOut" style={{ color: "white" }} onClick={() => handleLogOut()}>
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
