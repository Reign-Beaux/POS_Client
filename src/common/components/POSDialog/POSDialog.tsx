import { Dialog, DialogProps, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

export interface POSDialogProps extends DialogProps {
  children: React.ReactNode;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const POSDialog: React.FC<POSDialogProps> = ({ children, ...rest }) => {
  return (
    <Dialog fullWidth TransitionComponent={Transition} {...rest}>
      {children}
    </Dialog>
  );
};

export default POSDialog;
