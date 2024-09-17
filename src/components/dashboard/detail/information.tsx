"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { MangaTypeFilters } from '../manga/filters/manga-type';
import { MangaCategoryCheckBoxes } from '../core/form/manga-category';
import { IManga } from '@/redux/interfaces/interfaces';
import { MangaPilotForm } from '../core/form/manga-pilot';

interface MangaDetailProps {
    manga?: IManga | null;
}

const InformationDetail: React.FC<MangaDetailProps> = ({ manga }) => {
    return (
        <Card >
            <CardContent>
                <Box sx={{ mb: 2 }}>
                    <InputLabel sx={{ fontSize: "16px", mb: "5px", color: "#000" }}>Tên truyện</InputLabel>
                    <FormControl fullWidth>
                        <OutlinedInput
                            defaultValue={manga?.name}
                            fullWidth
                            placeholder="tên truyện"
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
                            defaultValue={manga?.name_alt}
                            fullWidth
                            placeholder="tên khác"
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
                        <MangaTypeFilters type={manga?.doujinshi} />
                    </FormControl >
                </Box>
                <Box sx={{ mb: 2 }}>
                    <InputLabel sx={{ fontSize: "16px", mb: "5px", color: "#000" }}>Thực hiện</InputLabel>
                    <FormControl fullWidth>
                        <OutlinedInput
                            defaultValue={manga?.finished_by}
                            fullWidth
                            placeholder="thực hiện"
                            sx={{
                                maxWidth: "100%",

                                height: '50px',
                            }}
                        />
                    </FormControl>
                </Box>
                <Box sx={{ mb: 2 }}>
                    <InputLabel sx={{ fontSize: "16px", mb: "5px", color: "#000" }}>Thể loại</InputLabel>
                    <MangaCategoryCheckBoxes props={manga?.genres} />
                </Box>
                <Box sx={{ mb: 5 }}>
                    <InputLabel sx={{ fontSize: "16px", mb: "5px", color: "#000" }}>Nội dung</InputLabel>
                    <MangaPilotForm text={manga?.pilot} />
                </Box>
            </CardContent>
        </Card>
    );
};

export default InformationDetail;