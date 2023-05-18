import { DRAWER_WIDTH } from "common/consts";
import { styled } from "@mui/material/styles";

export interface MainInterface {
  open?: boolean;
}

export const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<MainInterface>(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${DRAWER_WIDTH}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);
