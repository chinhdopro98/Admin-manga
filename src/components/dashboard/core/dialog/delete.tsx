import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { Warning } from '@phosphor-icons/react/dist/ssr';

interface ConfirmDeleteDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    name?: string;
    message?: string;
    type?: string
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({ open, onClose, onConfirm, name, message, type = '' }) => {
    console.log('ConfirmDeleteDialog');
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
            <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center', color: 'red' }}>
                <Warning size={42} style={{ color: 'red', marginRight: 10 }} />
                {"Cảnh báo"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message ? (
                        message
                    ) : (
                        <>
                            <Typography variant="h5" sx={{ mb: 1, mt: 1, display: "block", fontSize: '16px', }}>{`Bạn có chắc chắn muốn xóa ${type} không?`}</Typography>
                            <span style={{ marginTop: '8px' }}>
                                Name:
                            </span>
                            <Typography component="span" sx={{ color: 'red', fontWeight: 'bold' }}>
                                {` ${name}`}
                            </Typography>
                        </>
                    )}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ mr: 2 }}>
                <Button
                    onClick={onConfirm}
                    autoFocus
                    sx={{
                        height: "37px",
                        minWidth: "50px",
                        borderRadius: "5px",
                        backgroundColor: 'rgba(255, 0, 0, 1)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 0, 0, 0.8)',
                        }
                    }}
                >
                    Xóa
                </Button>
                <Button
                    onClick={onClose}
                    color="primary"
                    sx={{
                        height: "37px",
                        minWidth: "50px",
                        borderRadius: "5px",
                        backgroundColor: 'rgba(0, 0, 255, 1)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 255, 0.8)',
                        }
                    }}
                >
                    Hủy
                </Button>
            </DialogActions>
        </Dialog >
    );
};
const areEqual = (prevProps: ConfirmDeleteDialogProps, nextProps: ConfirmDeleteDialogProps) => {
    return prevProps.open === nextProps.open
};

export default React.memo(ConfirmDeleteDialog, areEqual);