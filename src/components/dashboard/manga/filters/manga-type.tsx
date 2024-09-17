import * as React from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { IType } from '@/redux/interfaces/interfaces';
import useDebounce from '@/hooks/use-hook-debound';
import { resetTypes } from '@/redux/reducers/type';
import { searchTypes } from '@/redux/actions/type';

interface TypeMangaProps {
    type?: IType | null;
}

export const MangaTypeFilters: React.FC<TypeMangaProps> = ({ type }) => {
    const [value, setValue] = React.useState<IType | null>(type|| null);
    const [inputValue, setInputValue] = React.useState<string>('');
    const dispatch = useAppDispatch();
    const types = useAppSelector((state: RootState) => state.type.types);
    const loading = useAppSelector((state: RootState) => state.type.loading);
    const debouncedQuery = useDebounce(inputValue);
    React.useEffect(() => {
        setValue(type|| null);
    }, [type]);
    React.useEffect(() => {
        if (debouncedQuery.trim() === '') {
            dispatch(resetTypes());
            setValue(type|| null);
        } else {
            dispatch(searchTypes(debouncedQuery));
        }
    }, [debouncedQuery, dispatch]);

    return (
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
};
