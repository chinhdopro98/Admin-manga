import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Box, Stack } from '@mui/material';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

interface MangaHotProps {
    is_hot?: boolean;
    sx?: React.CSSProperties;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#1890ff',
                ...theme.applyStyles('dark', {
                    backgroundColor: '#177ddc',
                }),
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)', width: 12, height: 12, borderRadius: 6, transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
        ...theme.applyStyles('dark', {
            backgroundColor: 'rgba(255,255,255,.35)',
        }),
    },
}));

export const MangaHotForm: React.FC<MangaHotProps> = ({ is_hot, sx, onChange }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            ...sx
        }}>
            <InputLabel sx={{ fontSize: "15px", color: "#000", mr: 1, overflow: "initial" }}>Hot</InputLabel>
            <FormControl fullWidth>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <AntSwitch checked={is_hot} onChange={onChange} inputProps={{ 'aria-label': 'ant design' }} />
                </Stack>
            </FormControl>
        </Box>
    );
}
