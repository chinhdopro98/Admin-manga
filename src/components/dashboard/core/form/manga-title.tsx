import React, { useEffect } from 'react';
import { Box, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import useDebounce from '@/hooks/use-hook-debound';

interface MangaTileProps {
    name: string | '';
    sx?: React.CSSProperties;
    showIcon?: boolean;
    onChange: (value: string) => void
}

export const MangaTitleForm: React.FC<MangaTileProps> = ({ name, sx, showIcon = false, onChange }) => {
    const [inputValue, setInputValue] = React.useState<string>(name || '');
    React.useEffect(() => {
        setInputValue(name);
    }, [name]);
    const debouncedValue = useDebounce(inputValue);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    React.useEffect(() => {
        onChange(debouncedValue)
    }, [debouncedValue]);
    return (
        <Box sx={sx}>
            <InputLabel sx={{ fontSize: "15px", mb: "5px", color: "#000" }}>Tên truyện, tên khác</InputLabel>
            <FormControl fullWidth>
                <OutlinedInput
                    value={inputValue}
                    fullWidth
                    onChange={handleChange}
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
};