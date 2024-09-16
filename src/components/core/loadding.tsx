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
          backgroundColor: 'rgba(255, 255, 255, 0)',
          color: '#000',
          zIndex: (theme) => theme.zIndex.drawer + 10,
        }}
      >
        <CircularProgress />
      </Backdrop>
    );
};

export default LoadingPopup;