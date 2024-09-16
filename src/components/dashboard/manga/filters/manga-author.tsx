import * as React from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { IAuthor } from '@/redux/interfaces/interfaces';
import useDebounce from '@/hooks/use-hook-debound';
import { resetAuthors } from '@/redux/reducers/author';
import { searchAuthors } from '@/redux/actions/author';

export const MangaAuthorFilters: React.FC = () => {
    const [value, setValue] = React.useState<IAuthor | null>(null);
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = React.useState<string>('');
    const authors = useAppSelector((state: RootState) => state.author.authors);
    const loading = useAppSelector((state: RootState) => state.author.loading);
    const debouncedQuery = useDebounce(inputValue);
    React.useEffect(() => {
        if (debouncedQuery.trim() === '') {
            dispatch(resetAuthors());
        } else {
            dispatch(searchAuthors(debouncedQuery));
        }
    }, [debouncedQuery, dispatch]);
    return (
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
                            height: '50px', // Set the height of the input
                        },
                    }}
                    {...params}
                    label="Search"
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
    );
}
