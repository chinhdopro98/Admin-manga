import * as React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Icon, Box } from '@mui/material';
import { XCircle } from '@phosphor-icons/react';

interface ErrorDialogProps {
    open: boolean;
    handleClose: () => void;
    message: string;
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({ open, handleClose, message }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                '& .MuiDialog-paper': {
                    maxWidth: '400px',
                    width: '100%',
                },
            }}
        >
            <DialogTitle id="alert-dialog-title">
                <Box display="flex" alignItems="center">
                    <Icon>
                        <XCircle size={25} color="red" />
                    </Icon>
                    <span style={{ marginLeft: '8px' }}>Lỗi</span>
                </Box>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ErrorDialog;