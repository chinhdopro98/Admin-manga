import * as React from 'react';
import { Autocomplete, Box, CircularProgress, FormControl, InputLabel, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { IAuthor } from '@/redux/interfaces/interfaces';
import useDebounce from '@/hooks/use-hook-debound';
import { resetAuthors } from '@/redux/reducers/author';
import { searchAuthors } from '@/redux/actions/author';

interface MangaAuthorProps {
    user?: IAuthor | null;
    sx?: React.CSSProperties;
    placeholder?: string;
    isRenderDetail?: boolean
}
export const MangaAuthorForm: React.FC<MangaAuthorProps> = ({ user, sx, placeholder, isRenderDetail }) => {
    const [value, setValue] = React.useState<IAuthor | null>(user || null);
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = React.useState<string>('');
    const authors = useAppSelector((state: RootState) => state.author.authors);
    const loading = useAppSelector((state: RootState) => state.author.loading);
    const debouncedQuery = useDebounce(inputValue);
    React.useEffect(() => {
        setValue(user || null);
        if (user) {
            isRenderDetail = false
        }
    }, [user]);
    React.useEffect(() => {
        if (debouncedQuery.trim() === '') {
            dispatch(resetAuthors());
        } else if (!isRenderDetail) {
            dispatch(searchAuthors(debouncedQuery));
        }
    }, [debouncedQuery, dispatch]);
    return (
        <Box sx={sx}>
            <InputLabel sx={{ fontSize: "16px", mb: "0px", color: "#000" }}>Tác giả</InputLabel>
            <FormControl fullWidth variant="outlined">
                <Autocomplete sx={{ maxWidth: "100%" }}
                    value={value}
                    onChange={(event: React.ChangeEvent<{}>, newValue: IAuthor | null) => {
                        setValue(newValue);
                    }}
                    onInputChange={(event: React.ChangeEvent<{}>, newInputValue: string) => {
                        setInputValue(newInputValue);
                    }}
                    options={authors}
                    getOptionLabel={(option) => option.name}
                    loading={loading}
                    renderInput={(params) => (
                        <TextField
                            sx={{
                                maxWidth: "100%",
                                '& .MuiInputBase-root': {
                                    height: '50px',
                                },
                            }}
                            {...params}
                            label={placeholder}
                            variant="outlined"
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
}
