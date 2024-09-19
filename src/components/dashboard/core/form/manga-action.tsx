import * as React from 'react';
import { Box, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

interface MangaActionProps {
    text?: string | '' | null;
    sx?: React.CSSProperties;
    placeholder?: string
}

export const MangaActionForm: React.FC<MangaActionProps> = ({ text, sx, placeholder }) => {
    return (
        <Box sx={sx}>
            <InputLabel sx={{ fontSize: "16px", mb: "5px", color: "#000" }}>Thực hiện</InputLabel>
            <FormControl fullWidth>
                <OutlinedInput
                    defaultValue={text}
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
