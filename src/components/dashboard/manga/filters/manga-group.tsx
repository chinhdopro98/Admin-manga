import * as React from 'react';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Autocomplete, Box, CircularProgress, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { searchGroups } from '@/redux/actions/group';
import { IGroup } from '@/redux/interfaces/interfaces';
import { resetGroups } from '@/redux/reducers/group';
import useDebounce from '@/hooks/use-hook-debound';
const states = [
    {
        value: 0,
        label: "Admin"
    },
    {
        value: 1,
        label: "Member"
    }
];

export const MangaGroupFilters: React.FC = () => {
    const [value, setValue] = React.useState<IGroup | null>(null);
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = React.useState<string>('');
    const groups = useAppSelector((state: RootState) => state.group.groups);
    const loading = useAppSelector((state: RootState) => state.group.loading);
    const debouncedQuery = useDebounce(inputValue);
    React.useEffect(() => {
        if (debouncedQuery.trim() === '') {
            dispatch(resetGroups());
        } else {
            dispatch(searchGroups(debouncedQuery));
        }
    }, [debouncedQuery, dispatch]);
    return (
        <Autocomplete
            value={value}
            onChange={(event: React.ChangeEvent<{}>, newValue: IGroup | null) => {
                setValue(newValue);
            }}
            onInputChange={(event: React.ChangeEvent<{}>, newInputValue: string) => {
                setInputValue(newInputValue);
            }}
            options={groups}
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
