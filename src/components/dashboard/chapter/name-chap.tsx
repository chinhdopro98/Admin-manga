import * as React from 'react';
import { Box, FormControl, InputLabel, OutlinedInput, Typography } from '@mui/material';

interface ChapNameProps {
    name: string;
    onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ChapName: React.FC<ChapNameProps> = ({ name, onNameChange }) => {
    return (
        <Box sx={{ mb: 3 }}>
            <InputLabel sx={{ fontSize: "16px", mb: "5px", color: "#000" }}>
                Tên truyện
                <Typography component="span" sx={{ color: "red", ml: 0.5 }}>*</Typography>
            </InputLabel>
            <FormControl fullWidth required>
                <OutlinedInput
                    value={name}
                    onChange={onNameChange}
                    fullWidth
                    placeholder='name'
                    required
                    sx={{
                        maxWidth: "100%",
                        height: '40px',
                        fontSize: '14px'
                    }}
                />
            </FormControl>
        </Box>
    );
}
