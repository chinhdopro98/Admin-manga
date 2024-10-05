import React, { useCallback } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

interface CreateButtonProps {
    onClick?: () => void;
    name: string
}

const HeaderPage: React.FC<CreateButtonProps> = ({ name, onClick }) => {
    console.log('Header')
    return (
        <Stack direction="row" spacing={3} alignItems="center" justifyContent="space-between">
            <Typography variant="h5">{name}</Typography>
            <Button
                startIcon={<PlusIcon style={{ fontSize: '16px' }} />}
                variant="contained"
                onClick={onClick}
                sx={{
                    padding: '4px 10px',
                    fontSize: '14px',
                    minWidth: 'auto',
                    borderRadius: "5px",
                }}
            >
                Tạo mới
            </Button>
        </Stack>

    );
};
export default React.memo(HeaderPage, () => true);