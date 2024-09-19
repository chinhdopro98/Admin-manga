import * as React from 'react';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { MangaGroupForm } from '../core/form/manga-group';
import { MangaCreatorForm } from '../core/form/manga-creator';
import { MangaAuthorForm } from '../core/form/manga-author';
import { MangaTypeForm } from '../core/form/manga-type';
import { MangaTitleForm } from '../core/form/manga-title';

const states = [
  {
    value: '0',
    label: "Tất cả"
  },
  {
    value: '1',
    label: "Chờ duyệt"
  },
  {
    value: '2',
    label: "Đã duyệt"
  }
];

export function MangaFilters(): React.JSX.Element {
  return (
    <Card sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid xs={12} sm={6} sx={{ padding: "10px 20px" }}>
          <MangaTitleForm />
        </Grid>
        <Grid xs={12} sm={6} sx={{ padding: "10px 20px" }}>
          <MangaGroupForm />
        </Grid>
        <Grid xs={12} sm={6} sx={{ padding: "10px 20px" }}>
          <MangaCreatorForm />
        </Grid>
        <Grid xs={12} sm={6} sx={{ padding: "10px 20px" }}>
          <MangaAuthorForm />
        </Grid>
        <Grid xs={12} sm={6} sx={{ padding: "10px 20px" }}>
          <MangaTypeForm />
        </Grid>
        <Grid xs={12} sm={6} sx={{ padding: "10px 20px" }}>
          <InputLabel sx={{ fontSize: "16px", mb: "0px", color: "#000" }}>Duyệt</InputLabel>
          <FormControl fullWidth variant="outlined">
            <Select
              labelId="state-label"
              label="State"
              name="state"
              defaultValue={'0'}
              fullWidth
              sx={{
                height: '50px',
                '& .MuiInputBase-root': {
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                },
              }}
            >
              {states.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{ height: '50px', display: 'flex', alignItems: 'center' }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mr: 2, mt: 2 }}>
        <Button variant="outlined">Reset</Button>
        <Button variant="contained">Tìm kiếm</Button>
      </Box>
    </Card>
  );
}
