import * as React from 'react';
import { Box, FormControl, InputLabel, OutlinedInput, Typography } from '@mui/material';

interface ChapNameProps {
    name: string;
    onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ChapName: React.FC<ChapNameProps> = ({ name, onNameChange }) => {
    const [error, setError] = React.useState(false);
    const handleBlur = () => {
        if (!name) {
            setError(true);
        } else {
            setError(false);
        }
    };
    return (
        <Box sx={{ mb: 3, position: 'relative' }}>
            <InputLabel sx={{ fontSize: "16px", mb: "5px", color: "#000" }}>
                Tên chương
                <Typography component="span" sx={{ color: "red", ml: 0.5 }}>*</Typography>
            </InputLabel>
            <FormControl fullWidth required error={error}>
                <OutlinedInput
                    value={name}
                    onChange={onNameChange}
                    onBlur={handleBlur}
                    fullWidth
                    placeholder='Tên chương'
                    required
                    sx={{
                        maxWidth: "100%",
                        height: '40px',
                        fontSize: '14px'
                    }}
                />
                {error && <Typography sx={{
                    color: 'red', mt: 1, position: 'absolute',
                    fontSize: '12px',
                    top: '80%',
                    left: 0
                }}>Field này là bắt buộc</Typography>}
            </FormControl>
        </Box>
    );
};