import * as React from 'react';
import { Autocomplete, Box, CircularProgress, FormControl, InputLabel, TextField } from '@mui/material';
import { IType } from '@/redux/interfaces/interfaces';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import useDebounce from '@/hooks/use-hook-debound';
import { resetTypes } from '@/redux/reducers/type';
import { searchTypes } from '@/redux/actions/type';

interface MangaTypeProps {
    type: IType | null;
    sx?: React.CSSProperties;
    placeholder?: string;
    onChange: (value: IType | null) => void;
    isSearchMode?: boolean;
    onInputChange: () => void;
}

export const MangaTypeForm: React.FC<MangaTypeProps> = ({ type, sx, placeholder, onChange, isSearchMode, onInputChange }) => {
    const [inputValue, setInputValue] = React.useState<string>('');
    const types = useAppSelector((state: RootState) => state.type.types);
    const loading = useAppSelector((state: RootState) => state.type.loading);
    const dispatch = useAppDispatch();
    const debouncedQuery = useDebounce(inputValue);
    const skipOnInputChange = React.useRef(true);

    React.useEffect(() => {
        if (debouncedQuery.trim() === '') {
            dispatch(resetTypes());
        } else if (!isSearchMode) {
            dispatch(searchTypes(debouncedQuery));
        }
    }, [debouncedQuery, dispatch, isSearchMode]);

    return (
        <Box sx={sx}>
            <InputLabel sx={{ fontSize: "15px", mb: "3px", color: "#000" }}>Kiểu truyện</InputLabel>
            <FormControl fullWidth>
                <Autocomplete
                    value={type}
                    onChange={(event: any, newValue: IType | null) => {
                        onChange(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        if (skipOnInputChange.current) {
                            skipOnInputChange.current = false;
                        } else {
                            onInputChange();
                        }
                        setInputValue(newInputValue);
                    }}
                    options={types}
                    getOptionLabel={(option) => option.name}
                    loading={loading}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={placeholder}
                            variant="outlined"
                            sx={{
                                maxWidth: "100%",
                                '& .MuiInputBase-root': {
                                    height: '45px',
                                    fontSize: "14px"
                                },
                            }}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading ? <CircularProgress color="inherit" size={15} /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                />
            </FormControl>
        </Box>
    );
};