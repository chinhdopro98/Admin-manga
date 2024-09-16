import * as React from 'react';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export const CompanionFilters: React.FC = () => {
    return (
        <Card sx={{ p: 3 }}>
            <InputLabel sx={{ fontSize: "18px", mb: "10px", color: "#000" }}>Tên bạn đồng hành</InputLabel>
            <FormControl fullWidth>
                <OutlinedInput
                    defaultValue=""
                    fullWidth
                    placeholder="name"
                    startAdornment={
                        <InputAdornment position="start">
                            <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
                        </InputAdornment>
                    }
                    sx={{ maxWidth: "100%" }}
                />
            </FormControl>
        </Card>
    );
}
