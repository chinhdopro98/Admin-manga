import * as React from 'react';
import { Autocomplete, Box, CircularProgress, FormControl, InputLabel, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { IUser } from '@/redux/interfaces/interfaces';
import useDebounce from '@/hooks/use-hook-debound';
import { resetUsers } from '@/redux/reducers/user';
import { searchUsers } from '@/redux/actions/user';

interface MangaCreatorProps {
    user?: IUser | null;
    sx?: React.CSSProperties;
    placeholder?: string
    onChange?: (value: IUser | null) => void;
    isSearchMode?: boolean;
    onInputChange?: () => void;
}

export const MangaCreatorForm: React.FC<MangaCreatorProps> = ({
    user,
    sx,
    placeholder,
    onChange = () => { },
    isSearchMode,
    onInputChange = () => { }
}) => {
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = React.useState<string>('');
    const users = useAppSelector((state: RootState) => state.user.users);
    const loading = useAppSelector((state: RootState) => state.user.loading);
    const debouncedQuery = useDebounce(inputValue);
    const skipOnInputChange = React.useRef(true);

    React.useEffect(() => {
        if (debouncedQuery.trim() === '') {
            dispatch(resetUsers());
        } else if (!isSearchMode) {
            dispatch(searchUsers(debouncedQuery));
        }
    }, [debouncedQuery, dispatch, isSearchMode]);
    return (
        <Box sx={sx}>
            <InputLabel sx={{ fontSize: "15px", mb: "3px", color: "#000" }}>Người đăng</InputLabel>
            <FormControl fullWidth variant="outlined">
                <Autocomplete
                    value={user}
                    onChange={(event: React.ChangeEvent<{}>, newValue: IUser | null) => {
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
                    options={users}
                    getOptionLabel={(option) => option.name}
                    loading={loading}
                    renderInput={(params) => (
                        <TextField
                            sx={{
                                maxWidth: "100%",
                                '& .MuiInputBase-root': {
                                    height: '45px',
                                    fontSize: "14px"
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
}
