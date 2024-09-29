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
    onChange: (value: IGroup | null) => void;
    isSearchMode?: boolean;
    onInputChange: () => void;
}

export const MangaGroupForm: React.FC<MangaGroupProps> = ({ group, sx, placeholder, onChange, isSearchMode, onInputChange }) => {
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = React.useState<string>('');
    const groups = useAppSelector((state: RootState) => state.group.groups);
    const loading = useAppSelector((state: RootState) => state.group.loading);
    const debouncedQuery = useDebounce(inputValue);
    const skipOnInputChange = React.useRef(true);
    React.useEffect(() => {
        if (debouncedQuery.trim() === '') {
            dispatch(resetGroups());
        } else if (!isSearchMode) {
            dispatch(searchGroups(debouncedQuery));
        }
    }, [debouncedQuery, dispatch, isSearchMode]);
    return (
        <Box sx={sx}>
            <InputLabel sx={{ fontSize: "15px", mb: "3px", color: "#000" }}>Nhóm dịch</InputLabel>
            <FormControl fullWidth>
                <Autocomplete
                    value={group}
                    onChange={(event: React.ChangeEvent<{}>, newValue: IGroup | null) => {
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
                    options={groups}
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
