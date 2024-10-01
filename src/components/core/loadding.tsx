import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

interface loading {
  open: boolean;
  bgDark?: string;
}
const LoadingPopup = ({ open, bgDark = 'rgba(255, 255, 255, 1)' }: loading) => {
  return (
    <Backdrop
      open={open}
      sx={{
        backgroundColor: bgDark,
        color: '#000',
        zIndex: (theme) => theme.zIndex.drawer + 10,
        position: 'fixed',
        top: "65px",
        bottom: 0,
        left: "250px",
        right: 0
      }}
    >
      <CircularProgress />
    </Backdrop>
  );
};

export default LoadingPopup;