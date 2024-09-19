import { Box, FormControl, InputLabel } from '@mui/material';
import dynamic from 'next/dynamic';
import * as React from 'react';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface MangaPilotProps {
    text?: string;
    sx?: React.CSSProperties;
}

export const MangaPilotForm: React.FC<MangaPilotProps> = ({ text, sx }) => {
    const [value, setValue] = React.useState(text);
    React.useEffect(() => {
        setValue(text);
    }, [text]);
    return (
        <Box sx={sx}>
            <InputLabel sx={{ fontSize: "16px", mb: "0px", color: "#000" }}>Nội dung </InputLabel>
            <FormControl fullWidth variant="outlined">
                <ReactQuill
                    theme="snow"
                    style={{ height: '20vh', maxHeight: '20vh' }}
                    value={value}
                    onChange={setValue}
                />
            </FormControl>
        </Box>
    );
};