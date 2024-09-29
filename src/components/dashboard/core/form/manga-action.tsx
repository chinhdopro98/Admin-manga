import * as React from 'react';
import { Box, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

interface MangaActionProps {
    text?: string | '' | null;
    sx?: React.CSSProperties;
    placeholder?: string;
    showIcon?: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const MangaActionForm: React.FC<MangaActionProps> = ({ text, sx, placeholder, showIcon, onChange }) => {
    return (
        <Box sx={sx}>
            <InputLabel sx={{ fontSize: "15px", mb: "3px", color: "#000" }}>Thực hiện</InputLabel>
            <FormControl fullWidth>
                <OutlinedInput
                    defaultValue={text}
                    fullWidth
                    placeholder={placeholder}
                    onChange={onChange}
                    startAdornment={
                        showIcon && (
                            <InputAdornment position="start">
                                <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
                            </InputAdornment>
                        )
                    }
                    sx={{
                        maxWidth: "100%",
                        height: '45px',
                        fontSize: "14px"
                    }}
                />
            </FormControl>
        </Box>
    );
}
