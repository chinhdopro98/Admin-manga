import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';

interface ConfirmDeleteDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    name?: string;
    message?: string;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({ open, onClose, onConfirm, name, message }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                '& .MuiDialog-paper': {
                    maxWidth: '450px',
                    width: '100%',
                },
            }}
        >
            <DialogTitle id="alert-dialog-title">{"Xác nhận xóa"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message ? (
                        message
                    ) : (
                        <>
                            Bạn có chắc chắn muốn xóa{" "}
                            <Typography component="span" sx={{ color: '#635bff', fontWeight: 'bold' }}>
                                {name}
                            </Typography>{" "}
                            không?
                        </>
                    )}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ mt: 2, mr: 2 }}>
                <Button
                    onClick={onConfirm}
                    color="error"
                    autoFocus
                    sx={{ minWidth: "50px", borderRadius: "5px", backgroundColor: 'rgba(255, 0, 0, 0.2)', '&:hover': { backgroundColor: 'rgba(255, 0, 0, 0.5)' } }}
                >
                    Xóa
                </Button>
                <Button
                    onClick={onClose}
                    color="primary"
                    sx={{ minWidth: "50px", borderRadius: "5px", backgroundColor: 'rgba(0, 0, 255, 0.2)', '&:hover': { backgroundColor: 'rgba(0, 0, 255, 0.5)' } }}
                >
                    Hủy
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDeleteDialog;