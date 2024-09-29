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
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Hủy
                </Button>
                <Button onClick={onConfirm} color="error" autoFocus>
                    Xóa
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationModal;