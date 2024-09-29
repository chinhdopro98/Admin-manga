import { Box, FormControl, InputLabel } from '@mui/material';
import dynamic from 'next/dynamic';
import * as React from 'react';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface MangaPilotProps {
    text?: string;
    sx?: React.CSSProperties;
    onChange: (value: string) => void;
}

export const MangaPilotForm: React.FC<MangaPilotProps> = ({ text, sx, onChange }) => {
    ;
    return (
        <Box sx={sx}>
            <InputLabel sx={{ fontSize: "15px", mb: "5px", color: "#000" }}>Nội dung </InputLabel>
            <FormControl fullWidth variant="outlined">
                <ReactQuill
                    theme="snow"
                    style={{ height: '20vh', maxHeight: '20vh', fontSize: "14px", }}
                    value={text}
                    onChange={onChange}
                />
            </FormControl>
        </Box>
    );
};