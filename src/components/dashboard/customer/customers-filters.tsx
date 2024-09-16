import * as React from 'react';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import Grid from '@mui/material/Unstable_Grid2';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
export const CustomersFilters: React.FC = () => {
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
  return (
    <Card sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid xs={12} sm={6}>
          <InputLabel sx={{ fontSize: "18px", mb: "10px", color: "#000" }}>User Id</InputLabel>
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
              sx={{ maxWidth: "100%" }}
            />
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6}>
          <InputLabel sx={{ fontSize: "18px", mb: "10px", color: "#000" }}>Email</InputLabel>
          <FormControl fullWidth>
            <OutlinedInput
              defaultValue=""
              fullWidth
              placeholder="email"
              startAdornment={
                <InputAdornment position="start">
                  <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
                </InputAdornment>
              }
              sx={{ maxWidth: "100%" }}
            />
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6}>
          <InputLabel sx={{ fontSize: "18px", mb: "10px", color: "#000" }}>Tên</InputLabel>
          <FormControl fullWidth>
            <OutlinedInput
              defaultValue=""
              fullWidth
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
        <Grid xs={12} sm={6}>
          <InputLabel sx={{ fontSize: "18px", mb: "10px", color: "#000" }}>State</InputLabel>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="state-label">State</InputLabel>
            <Select
              labelId="state-label"
              defaultValue="ny"
              label="State"
              name="state"
              fullWidth
            >
              {states.map((option) => (
                <MenuItem key={option.value} value={option.value} sx={{ height: "50px" }}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Card>
  );
}
