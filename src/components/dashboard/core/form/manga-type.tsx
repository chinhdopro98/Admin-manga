import * as React from 'react';
import { Autocomplete, Box, CircularProgress, FormControl, InputLabel, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { IType } from '@/redux/interfaces/interfaces';
import useDebounce from '@/hooks/use-hook-debound';
import { resetTypes } from '@/redux/reducers/type';
import { searchTypes } from '@/redux/actions/type';

interface MangaTypeProps {
    type?: IType | null;
    sx?: React.CSSProperties;
    placeholder?: string;
    isRenderDetail?: boolean
}

export const MangaTypeForm: React.FC<MangaTypeProps> = ({ type, sx, placeholder, isRenderDetail }) => {
    const [value, setValue] = React.useState<IType | null>(type || null);
    const [inputValue, setInputValue] = React.useState<string>('');
    const dispatch = useAppDispatch();
    const types = useAppSelector((state: RootState) => state.type.types);
    const loading = useAppSelector((state: RootState) => state.type.loading);
    const debouncedQuery = useDebounce(inputValue);
    React.useEffect(() => {
        setValue(type || null);
        if (type) {
            isRenderDetail = false;
        }
    }, [type]);
    React.useEffect(() => {
        if (debouncedQuery.trim() === '') {
            dispatch(resetTypes());
            setValue(type || null);
        } else if (!isRenderDetail) {
            dispatch(searchTypes(debouncedQuery));
        }
    }, [debouncedQuery, dispatch]);

    return (
        <Box sx={sx}>
            <InputLabel sx={{ fontSize: "16px", mb: "0px", color: "#000" }}>Kiểu truyện</InputLabel>
            <FormControl fullWidth>
                <Autocomplete
                    value={value}
                    onChange={(event: React.ChangeEvent<{}>, newValue: IType | null) => {
                        setValue(newValue);
                    }}
                    onInputChange={(event: React.ChangeEvent<{}>, newInputValue: string) => {
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
                                    height: '50px',
                                },
                            }}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
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
