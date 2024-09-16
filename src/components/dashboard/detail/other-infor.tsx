"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardContent, FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
const OtherInfoDetail: React.FC = () => {
    return (
        <Card >
            <CardContent>
                <Box>

                    <img src='http://localhost:8000/storage/images/covers/d4626f96-3f2b-413a-a585-f2189d01b344.jpg?w=' style={{ width: "100%", height: "220px" }} />
                </Box>

            </CardContent>
        </Card >
    );
};

export default OtherInfoDetail;