import * as React from 'react';
import { Box, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

interface MangaTileProps {
    name?: string | '';
    sx?: React.CSSProperties;
}

export const MangaTitleForm: React.FC<MangaTileProps> = ({ name, sx }) => {
    return (
        <Box sx={sx}>
            <InputLabel sx={{ fontSize: "16px", mb: "5px", color: "#000" }}>Tên truyện, tên khác</InputLabel>
            <FormControl fullWidth>
                <OutlinedInput
                    defaultValue={name}
                    fullWidth
                    placeholder="Tên truyện, tên khác"
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
