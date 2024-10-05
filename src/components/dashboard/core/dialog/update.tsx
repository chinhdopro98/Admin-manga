import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, FormControl, OutlinedInput } from '@mui/material';
import { PencilSimple, PencilSimpleLine, PlusCircle } from '@phosphor-icons/react/dist/ssr';

interface ConfirmUpdateDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (name: string) => void;
    name?: string;
    inputValue: string;
    onInputChange: (value: string) => void;
}

const UpdateItemDialog: React.FC<ConfirmUpdateDialogProps> = ({
    open,
    onClose,
    onConfirm,
    inputValue,
    onInputChange,
    name = '',
}) => {
    console.log('CreateItemDialog')
    const handleConfirm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onConfirm(inputValue);
            onClose();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                '& .MuiDialog-paper': {
                    maxWidth: '500px',
                    width: '100%',

                },
            }}
        >
            <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center', color: '#007BFF' }}>
                <PencilSimpleLine size={30} style={{ color: '#007BFF', marginRight: 10 }} />
                {"Chỉnh sửa"}
            </DialogTitle>
            <form onSubmit={handleConfirm}>
                <DialogContent sx={{ p: "0 24px" }}>
                    <InputLabel sx={{ mb: 2, fontSize: '15px', display: 'flex', alignItems: 'center' }}>
                        {name}:
                        <span style={{ color: 'red', marginLeft: '5px', visibility: inputValue.trim() ? 'hidden' : 'visible' }}>*</span>
                    </InputLabel>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <OutlinedInput
                            placeholder='name'
                            value={inputValue}
                            onChange={(e) => onInputChange(e.target.value)}
                            required
                            sx={{
                                height: '45px',
                                fontSize: '14px',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'gray',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'blue',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'blue',
                                },
                            }}
                        />
                    </FormControl>

                </DialogContent>
                <DialogActions sx={{ mr: 2, mb: 2 }}>
                    <Button
                        onClick={onClose}
                        autoFocus
                        sx={{
                            height: "37px",
                            minWidth: "50px",
                            borderRadius: "5px",
                            backgroundColor: '#FF0000',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 0, 0, 0.8)',
                            }
                        }}
                    >
                        Hủy
                    </Button>
                    <Button
                        type="submit"
                        disabled={!inputValue.trim()}
                        sx={{
                            height: "37px",
                            minWidth: "50px",
                            borderRadius: "5px",
                            background: !inputValue.trim() ? '#A0C4FF' : '#007BFF',
                            color: !inputValue.trim() ? '#B0B0B0' : 'white',
                            '&:hover': {
                                backgroundColor: !inputValue.trim() ? '#A0C4FF' : 'rgba(0, 0, 255, 0.8)'
                            }
                        }}
                    >
                        Lưu
                    </Button>
                </DialogActions>
            </form>
        </Dialog >
    );
};

const areEqual = (prevProps: ConfirmUpdateDialogProps, nextProps: ConfirmUpdateDialogProps) => {
    return prevProps.open === nextProps.open && prevProps.inputValue === nextProps.inputValue;
};

export default React.memo(UpdateItemDialog, areEqual);

