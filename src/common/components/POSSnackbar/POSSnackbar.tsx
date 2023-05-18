import { POSReducer } from '@/redux';
import { resetSnackbar } from '@/redux/slices';
import { AlertColor, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
export interface POSSnackbarProps {}

const POSSnackbar : React.FC<POSSnackbarProps> = () => {
  const dispatcher = useDispatch();
  const { isOpen, severity, message } = useSelector((store: POSReducer) => store.snackbar);

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = () => {
    dispatcher(resetSnackbar());
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );	
};

export default POSSnackbar;
