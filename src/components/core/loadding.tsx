import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

interface loading {
  open: boolean;
  bgDark?: boolean;
}
const LoadingPopup = ({ open, bgDark = false }: loading) => {
  return (
    <Backdrop
      open={open}
      sx={{
        backgroundColor: bgDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 1)',
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