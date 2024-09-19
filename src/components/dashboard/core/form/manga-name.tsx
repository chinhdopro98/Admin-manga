import * as React from 'react';
import { Box, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

interface MangaNameProps {
    name?: string | '';
    sx?: React.CSSProperties;
    placeholder?: string
}

export const MangaNameForm: React.FC<MangaNameProps> = ({ name, sx, placeholder }) => {
    return (
        <Box sx={sx}>
            <InputLabel sx={{ fontSize: "16px", mb: "5px", color: "#000" }}>Tên truyện</InputLabel>
            <FormControl fullWidth>
                <OutlinedInput
                    defaultValue={name}
                    fullWidth
                    placeholder={placeholder}
                    startAdornment={
                        <InputAdornment position="start">
                            <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
                        </InputAdornment>
                    }
                    sx={{
                        maxWidth: "100%",
                        height: '50px',
                    }}
                />
            </FormControl>
        </Box>
    );
}
