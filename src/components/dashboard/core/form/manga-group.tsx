import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Autocomplete, Box, CircularProgress, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { searchGroups } from '@/redux/actions/group';
import { IGroup } from '@/redux/interfaces/interfaces';
import { resetGroups } from '@/redux/reducers/group';
import useDebounce from '@/hooks/use-hook-debound';

interface MangaGroupProps {
    group?: IGroup | null;
    sx?: React.CSSProperties;
    placeholder?: string;
    isRenderDetail?: boolean
}

export const MangaGroupForm: React.FC<MangaGroupProps> = ({ group, sx, placeholder, isRenderDetail }) => {
    const [value, setValue] = React.useState<IGroup | null>(group || null);
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = React.useState<string>('');
    const groups = useAppSelector((state: RootState) => state.group.groups);
    const loading = useAppSelector((state: RootState) => state.group.loading);
    const debouncedQuery = useDebounce(inputValue);
    React.useEffect(() => {
        setValue(group || null);
        if (group) {
            isRenderDetail = false;
        }
    }, [group]);

    React.useEffect(() => {
        if (debouncedQuery.trim() === '') {
            dispatch(resetGroups());
        } else if (!isRenderDetail) {
            dispatch(searchGroups(debouncedQuery));
        }
    }, [debouncedQuery, dispatch]);
    return (
        <Box sx={sx}>
            <InputLabel sx={{ fontSize: "16px", mb: "0px", color: "#000" }}>Nhóm dịch</InputLabel>
            <FormControl fullWidth>
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
