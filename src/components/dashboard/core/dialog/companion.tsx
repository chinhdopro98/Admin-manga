import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, FormControl, OutlinedInput, Box } from '@mui/material';
import { ImageSquare, ImagesSquare, PencilSimpleLine, PlusCircle, UploadSimple } from '@phosphor-icons/react/dist/ssr';

interface ConfirmCreateDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (name: string) => void;
    name?: string;
    inputName: string;
    onChangeName: (value: string) => void;
    inputPrice: string;
    onChangePrice: (value: string) => void;
    image?: File | null;
    url?: string;
    onChangeImage: (file: File | null) => void;
    mode: 'add' | 'edit';
}

const FormCompanionDialog: React.FC<ConfirmCreateDialogProps> = ({
    open,
    onClose,
    onConfirm,
    inputName,
    onChangeName,
    inputPrice,
    onChangePrice,
    image,
    onChangeImage,
    url,
    mode
}) => {
    const handleConfirm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputName.trim()) {
            onConfirm(inputName);
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
                    maxWidth: '650px',
                    width: '100%',
                },
            }}
        >
            <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center', color: '#007BFF' }}>
                {
                    mode === 'add' ? (
                        <>
                            <PlusCircle size={30} style={{ color: '#007BFF', marginRight: 10 }} />
                            {"Thêm mới"}
                        </>
                    ) : (
                        <>
                            <PencilSimpleLine size={30} style={{ color: '#007BFF', marginRight: 10 }} />
                            {"Chỉnh sửa"}
                        </>
                    )
                }
            </DialogTitle>
            <form onSubmit={handleConfirm}>
                <DialogContent sx={{ p: "0 24px", display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '120px', mr: 5 }}>
                        <Box sx={{ height: '150px' }}>
                            {(image || url) ? (
                                <img
                                    src={image ? URL.createObjectURL(image) : url}
                                    alt="Selected"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                                />
                            ) : (
                                <ImageSquare size={100} />
                            )}
                        </Box>
                        <input
                            type="file"
                            hidden
                            onChange={(e) => onChangeImage(e.target.files ? e.target.files[0] : null)}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => onChangeImage(e.target.files ? e.target.files[0] : null)}
                            style={{ display: 'none' }}
                            id="file-input"
                        />
                        <br />
                        <label htmlFor="file-input">
                            <Button
                                variant="outlined"
                                component="span"
                                sx={{

                                    borderColor: 'blue',
                                    borderWidth: '1px',
                                    borderRadius: '4px',
                                    backgroundColor: 'transparent',
                                    color: 'blue',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 255, 0.1)',
                                        borderColor: 'blue',
                                    },
                                }}
                            >
                                <UploadSimple size={20} /> Upload
                            </Button>
                        </label>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <InputLabel sx={{ mb: 1, fontSize: '15px', display: 'flex', alignItems: 'center' }}>
                            Tên:
                            <span style={{ color: 'red', marginLeft: '5px', visibility: inputName.trim() ? 'hidden' : 'visible' }}>*</span>
                        </InputLabel>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <OutlinedInput
                                placeholder='Tên'
                                value={inputName}
                                onChange={(e) => onChangeName(e.target.value)}
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

                        <InputLabel sx={{ mb: 1, fontSize: '15px', display: 'flex', alignItems: 'center' }}>
                            Giá:
                            <span style={{ color: 'red', marginLeft: '5px', visibility: inputPrice.trim() ? 'hidden' : 'visible' }}>*</span>
                        </InputLabel>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <OutlinedInput
                                placeholder='Giá'
                                value={inputPrice}
                                onChange={(e) => onChangePrice(e.target.value)}
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
                    </Box>
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
                        disabled={!inputName.trim()}
                        sx={{
                            height: "37px",
                            minWidth: "50px",
                            borderRadius: "5px",
                            background: !inputName.trim() ? '#A0C4FF' : '#007BFF',
                            color: !inputName.trim() ? '#B0B0B0' : 'white',
                            '&:hover': {
                                backgroundColor: !inputName.trim() ? '#A0C4FF' : 'rgba(0, 0, 255, 0.8)'
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

const areEqual = (prevProps: ConfirmCreateDialogProps, nextProps: ConfirmCreateDialogProps) => {
    return prevProps.open === nextProps.open &&
        prevProps.inputName === nextProps.inputName &&
        prevProps.inputPrice === nextProps.inputPrice &&
        prevProps.image === nextProps.image
        ;
};

export default React.memo(FormCompanionDialog, areEqual);