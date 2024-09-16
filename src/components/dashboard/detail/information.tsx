"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { MangaTypeFilters } from '../manga/filters/manga-type';
import { MangaCategoryCheckBoxes } from '../core/form/manga-category';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const InformationDetail: React.FC = () => {
    const [value, setValue] = React.useState('');
    return (
        <Card >
            <CardContent>
                <Box sx={{ mb: 2 }}>
                    <InputLabel sx={{ fontSize: "16px", mb: "5px", color: "#000" }}>Tên truyện</InputLabel>
                    <FormControl fullWidth>
                        <OutlinedInput
                            defaultValue=""
                            fullWidth
                            placeholder="tên truyện"
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
                </Box>
                <Box sx={{ mb: 2 }}>
                    <InputLabel sx={{ fontSize: "16px", mb: "5px", color: "#000" }}>Tên khác (cách nhau bằng dấu chấm phẩy)</InputLabel>
                    <FormControl fullWidth>
                        <OutlinedInput
                            defaultValue=""
                            fullWidth
                            placeholder="tên khác"
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
                </Box>
                <Box sx={{ mb: 2 }}>
                    <InputLabel sx={{ fontSize: "16px", mb: "5px", color: "#000" }}>Kiểu truyện</InputLabel>
                    <FormControl fullWidth variant="outlined">
                        <MangaTypeFilters />
                    </FormControl >
                </Box>
                <Box sx={{ mb: 2 }}>
                    <InputLabel sx={{ fontSize: "16px", mb: "5px", color: "#000" }}>Tên khác (cách nhau bằng dấu chấm phẩy)</InputLabel>
                    <FormControl fullWidth>
                        <OutlinedInput
                            defaultValue=""
                            fullWidth
                            placeholder="thực hiện"
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
                </Box>
                <Box sx={{ mb: 2 }}>
                    <InputLabel sx={{ fontSize: "16px", mb: "5px", color: "#000" }}>Thể loại</InputLabel>
                    <MangaCategoryCheckBoxes />
                </Box>
                <Box sx={{ mb: 5 }}>
                    <InputLabel sx={{ fontSize: "16px", mb: "5px", color: "#000" }}>Nội dung</InputLabel>
                    <ReactQuill
                        theme="snow"
                        style={{ height: '20vh', maxHeight: '20vh' }} // Set fixed height and overflow behavior
                        value={value}
                        onChange={setValue}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default InformationDetail;