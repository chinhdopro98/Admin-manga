import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';


interface MangaApprovalProps {
    value?: string;
    onChange?: (event: SelectChangeEvent<string>) => void;
}
const states = [
    {
        value: '0',
        label: "Tất cả"
    },
    {
        value: '1',
        label: "Chờ duyệt"
    },
    {
        value: '2',
        label: "Đã duyệt"
    }
];

const MangaApprovalForm: React.FC<MangaApprovalProps> = ({ value, onChange }) => {
    return (
        <>
            <InputLabel sx={{ fontSize: "16px", mb: "0px", color: "#000" }}>Duyệt</InputLabel>
            <FormControl fullWidth variant="outlined">
                <Select
                    labelId="state-label"
                    label="State"
                    name="state"
                    value={value}
                    onChange={onChange}
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
        </>
    );
};

export default MangaApprovalForm;