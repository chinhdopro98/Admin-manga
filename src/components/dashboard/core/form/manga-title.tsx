import * as React from 'react';
import { Box, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

interface MangaTileProps {
    name?: string | '';
    sx?: React.CSSProperties;
    showIcon?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const MangaTitleForm: React.FC<MangaTileProps> = React.memo(({ name, sx, showIcon = false, onChange }) => {
    return (
        <Box sx={sx}>
            <InputLabel sx={{ fontSize: "15px", mb: "5px", color: "#000" }}>Tên truyện, tên khác</InputLabel>
            <FormControl fullWidth>
                <OutlinedInput
                    value={name}
                    fullWidth
                    onChange={onChange}
                    placeholder="Tên truyện, tên khác"
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
                        fontSize: "14px",
                    }}
                />
            </FormControl>
        </Box>
    );
});