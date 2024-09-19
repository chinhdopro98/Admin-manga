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
    isRenderDetail?: boolean
}

export const MangaCreatorForm: React.FC<MangaCreatorProps> = ({ user, sx, placeholder, isRenderDetail }) => {
    const [value, setValue] = React.useState<IUser | null>(null);
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = React.useState<string>('');
    const users = useAppSelector((state: RootState) => state.user.users);
    const loading = useAppSelector((state: RootState) => state.user.loading);
    const debouncedQuery = useDebounce(inputValue);
    React.useEffect(() => {
        setValue(user || null);
        if (user) {
            isRenderDetail = false;
        }
    }, [user]);
    React.useEffect(() => {
        if (debouncedQuery.trim() === '') {
            dispatch(resetUsers());
        } else if (!isRenderDetail) {
            dispatch(searchUsers(debouncedQuery));
        }
    }, [debouncedQuery, dispatch]);
    return (
        <Box sx={sx}>
            <InputLabel sx={{ fontSize: "16px", mb: "0px", color: "#000" }}>Người đăng</InputLabel>
            <FormControl fullWidth variant="outlined">
                <Autocomplete
                    value={value}
                    onChange={(event: React.ChangeEvent<{}>, newValue: IUser | null) => {
                        setValue(newValue);
                    }}
                    onInputChange={(event: React.ChangeEvent<{}>, newInputValue: string) => {
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
