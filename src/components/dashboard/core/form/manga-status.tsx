import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Box, SelectChangeEvent } from '@mui/material';

const states = [
    {
        value: 1,
        label: "Đã hoàn thành"
    },
    {
        value: 2,
        label: "Đang tiến hành"
    }
];

interface MangaStatusProps {
    status?: number | null;
    sx?: React.CSSProperties;
    onChange: (value: number | null) => void;
}

export const MangaStatusForm: React.FC<MangaStatusProps> = ({ status, sx, onChange }) => {
    const handleChange = (event: SelectChangeEvent<number>) => {
        onChange(Number(event.target.value));
    };
    return (
        <Box sx={sx}>
            <InputLabel sx={{ fontSize: "15px", mb: "3px", color: "#000" }}>Trạng thái</InputLabel>
            <FormControl fullWidth variant="outlined">
                <Select
                    labelId="state-label"
                    value={status !== null && status !== undefined ? status : ""}
                    label="State"
                    name="state"
                    onChange={handleChange}
                    fullWidth
                    sx={{
                        height: '45px',
                        '& .MuiInputBase-root': {
                            height: '45px',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: "14px"
                        },
                    }}
                >
                    {states.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                            sx={{ height: '45px', display: 'flex', alignItems: 'center', fontSize: "14px" }}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};