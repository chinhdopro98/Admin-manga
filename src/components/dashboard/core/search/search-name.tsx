import * as React from 'react';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Box, Button } from '@mui/material';

interface SearchNameProps {
    value: string;
    onSearchChange: (value: string) => void;
    onReset: () => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    title: string,
    placeholder?: string

}

const SearchName: React.FC<SearchNameProps> = ({ value, onSearchChange, title, placeholder, onReset, onSubmit }) => {
    console.log('search name')
    return (
        <form onSubmit={onSubmit}>
            <Card sx={{ p: 2 }}>
                <InputLabel sx={{ fontSize: "16px", mb: "5px", color: "#000" }}>{title}:</InputLabel>
                <FormControl fullWidth>
                    <OutlinedInput
                        value={value}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder={placeholder}
                        startAdornment={
                            <InputAdornment position="start">
                                <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
                            </InputAdornment>
                        }
                        sx={{
                            maxWidth: "100%",
                            height: '45px',
                            fontSize: "14px",
                        }}

                    />
                </FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                    <Button variant="outlined" onClick={onReset}
                        sx={{
                            padding: '4px 10px',
                            fontSize: '14px',
                            minWidth: 'auto',
                            borderRadius: "5px",
                            mr: 1
                        }}
                    >Reset</Button>
                    <Button variant="contained" type="submit"
                        sx={{
                            padding: '4px 10px',
                            fontSize: '14px',
                            minWidth: 'auto',
                            borderRadius: "5px"
                        }}
                    >Tìm kiếm</Button>
                </Box>
            </Card>
        </form>
    );
}

const areEqual = (prevProps: SearchNameProps, nextProps: SearchNameProps) => {
    return prevProps.value === nextProps.value
};

export default React.memo(SearchName, areEqual);