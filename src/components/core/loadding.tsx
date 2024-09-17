import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

interface loading {
  open: boolean;
}
const LoadingPopup = ({ open }: loading) => {
  return (
    <Backdrop
      open={open}
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 1)',
        color: '#000',
        zIndex: (theme) => theme.zIndex.drawer + 10,
        position: 'fixed',
        top: "65px",
        bottom: 0,
        left: "280px",
        right: 0
      }}
    >
      <CircularProgress />
    </Backdrop>
  );
};

export default LoadingPopup;