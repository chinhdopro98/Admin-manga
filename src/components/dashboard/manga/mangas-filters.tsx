import * as React from 'react';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { MangaGroupFilters } from './filters/manga-group';
import { MangaUserFilters } from './filters/manga-user';
import { MangaAuthorFilters } from './filters/manga-author';
import { MangaTypeFilters } from './filters/manga-type';
const states = [
  {
    value: 0,
    label: "Tất cả"
  },
  {
    value: 1,
    label: "Chờ duyệt"
  },
  {
    value: 2,
    label: "Đã duyệt"
  }
];

export function MangaFilters(): React.JSX.Element {
  return (
    <Card sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid xs={12} sm={6} sx={{ padding: "10px 20px" }}>
          <InputLabel sx={{ fontSize: "16px", mb: "0px", color: "#000" }}>Tên truyện, tên khác</InputLabel>
          <FormControl fullWidth>
            <OutlinedInput
              defaultValue=""
              fullWidth
              placeholder="Search userId"
              startAdornment={
                <InputAdornment position="start">
                  <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
                </InputAdornment>
              }
              sx={{
                maxWidth: "100%",

                height: '50px',
              }}
            />
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6} sx={{ padding: "10px 20px" }}>
          <InputLabel sx={{ fontSize: "16px", mb: "0px", color: "#000" }}>Nhóm dịch</InputLabel>
          <FormControl fullWidth>
            <MangaGroupFilters />
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6} sx={{ padding: "10px 20px" }}>
          <InputLabel sx={{ fontSize: "16px", mb: "0px", color: "#000" }}>Người đăng</InputLabel>
          <FormControl fullWidth>
            <MangaUserFilters />
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6} sx={{ padding: "10px 20px" }}>
          <InputLabel sx={{ fontSize: "16px", mb: "0px", color: "#000" }}>Tác giả</InputLabel>
          <FormControl fullWidth variant="outlined">
            <MangaAuthorFilters />
          </FormControl >
        </Grid>
        <Grid xs={12} sm={6} sx={{ padding: "10px 20px" }}>
          <InputLabel sx={{ fontSize: "16px", mb: "0px", color: "#000" }}>Kiểu truyện</InputLabel>
          <FormControl fullWidth variant="outlined">
            <MangaTypeFilters />
          </FormControl >
        </Grid>
        <Grid xs={12} sm={6} sx={{ padding: "10px 20px" }}>
          <InputLabel sx={{ fontSize: "16px", mb: "0px", color: "#000" }}>Duyệt</InputLabel>
          <FormControl fullWidth variant="outlined">
            <Select
              labelId="state-label"
              defaultValue="ny"
              label="State"
              name="state"
              defaultValue={0}
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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mr: 2, mt:2 }}>
        <Button variant="outlined">Reset</Button>
        <Button variant="contained">Tìm kiếm</Button>
      </Box>
    </Card>
  );
}
