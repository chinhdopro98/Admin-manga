import * as React from 'react';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { Grid } from '@mui/material';

export const CommentFilters: React.FC = () => {
    return (
        <Card sx={{ p: 3 }}>
            <Grid container spacing={2} alignItems="center">
                {/* Input Label and Text Input */}
                <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ fontSize: "18px", mb: "10px", color: "#000" }}>
                        Tên thành viên
                    </InputLabel>
                    <FormControl fullWidth>
                        <OutlinedInput
                            defaultValue=""
                            placeholder="name"
                            startAdornment={
                                <InputAdornment position="start">
                                    <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
                                </InputAdornment>
                            }
                            sx={{ maxWidth: "100%" }}
                        />
                    </FormControl>
                </Grid>

                {/* Date Range Picker */}
                <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ fontSize: "18px", mb: "10px", color: "#000" }}>
                    Ngày comment
                    </InputLabel>
                    <FormControl fullWidth>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateRangePicker']}>
                                <DateRangePicker localeText={{ start: 'Start', end: 'End' }} />
                            </DemoContainer>
                        </LocalizationProvider>
                    </FormControl>
                </Grid>
            </Grid>
        </Card>
    );
}
