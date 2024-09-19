import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import { Box, InputLabel, MenuItem, Select } from '@mui/material';

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
}

export const MangaStatusForm: React.FC<MangaStatusProps> = ({ status, sx }) => {
    const [value, setValue] = React.useState<number | null>(status || null);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setValue(event.target.value as number);
    };
    React.useEffect(() => {
        setValue(status || null);
    }, [status]);
    return (
        <Box sx={sx}>
            <InputLabel sx={{ fontSize: "16px", mb: "0px", color: "#000" }}>Trạng thái</InputLabel>
            <FormControl fullWidth variant="outlined">
                <Select
                    labelId="state-label"
                    value={value ?? ''}
                    label="State"
                    name="state"
                    onChange={handleChange}
                    fullWidth
                    sx={{
                        height: '50px',
                        '& .MuiInputBase-root': {
                            height: '50px',
                            display: 'flex',
                            alignItems: 'center',
                        },
                    }}
                >
                    {states.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                            sx={{ height: '50px', display: 'flex', alignItems: 'center' }}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
