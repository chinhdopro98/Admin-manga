import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';

interface DeleteConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
    message?: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ open, onClose, onConfirm, itemName, message }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
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
                                {itemName}
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

export default DeleteConfirmationModal;