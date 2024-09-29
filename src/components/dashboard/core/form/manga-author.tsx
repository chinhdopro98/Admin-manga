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
    onChange: (value: IAuthor | null) => void;
    isSearchMode?: boolean;
    onInputChange: () => void;
}
export const MangaAuthorForm: React.FC<MangaAuthorProps> = React.memo(({ user, sx, placeholder, isSearchMode, onChange, onInputChange }) => {
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = React.useState<string>('');
    const authors = useAppSelector((state: RootState) => state.author.authors);
    const loading = useAppSelector((state: RootState) => state.author.loading);
    const debouncedQuery = useDebounce(inputValue);
    const skipOnInputChange = React.useRef(true);
    React.useEffect(() => {
        if (debouncedQuery.trim() === '') {
            dispatch(resetAuthors());
        } else if (!isSearchMode) {
            dispatch(searchAuthors(debouncedQuery));
        }
    }, [debouncedQuery, dispatch, isSearchMode]);
    return (
        <Box sx={sx}>
            <InputLabel sx={{ fontSize: "15px", mb: "3px", color: "#000" }}>Tác giả</InputLabel>
            <FormControl fullWidth variant="outlined">
                <Autocomplete sx={{ maxWidth: "100%" }}
                    value={user}
                    onChange={(event: React.ChangeEvent<{}>, newValue: IAuthor | null) => {
                        onChange(newValue);
                    }}
                    onInputChange={(event: React.ChangeEvent<{}>, newInputValue: string) => {
                        if (skipOnInputChange.current) {
                            skipOnInputChange.current = false;
                        } else {
                            onInputChange();
                        }
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
                                    height: '45px',
                                    fontSize: "14px",
                                },
                            }}
                            {...params}
                            label={placeholder}
                            variant="outlined"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading ? <CircularProgress color="inherit" size={14} /> : null}
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
});
