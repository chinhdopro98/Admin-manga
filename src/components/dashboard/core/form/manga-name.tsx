import * as React from 'react';
import { Box, FormControl, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

interface MangaNameProps {
    name?: string | '';
    sx?: React.CSSProperties;
    placeholder?: string,
    showIcon?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const MangaNameForm: React.FC<MangaNameProps> = React.memo(({ name, sx, placeholder, showIcon, onChange }) => {
    const [error, setError] = React.useState(false);
    const handleBlur = () => {
        if (!name) {
            setError(true);
        } else {
            setError(false);
        }
    };
    return (
        <Box sx={{ position: 'relative', ...sx }}>
            <InputLabel sx={{ fontSize: "15px", mb: "3px", color: "#000" }}>Tên truyện</InputLabel>
            <FormControl fullWidth>
                <OutlinedInput
                    value={name}
                    fullWidth
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={handleBlur}
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
                {error && <Typography sx={{
                    color: 'red', mt: 1, position: 'absolute',
                    fontSize: '12px',
                    top: '80%',
                    left: 0
                }}>Field này là bắt buộc</Typography>}
            </FormControl>
        </Box>
    );
});