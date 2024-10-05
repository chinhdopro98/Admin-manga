import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Switch from '@mui/material/Switch';
import dayjs from 'dayjs';
import { ICategory } from '@/redux/interfaces/interfaces';
import { Button } from '@mui/material';

interface CategoryItemProps {
    category: ICategory;
    handleChangePC: (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangeMB: (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => void;
    onDelete: (category: ICategory) => void;
}

export function CategoryItem({
    category,
    handleChangePC,
    handleChangeMB,
    onDelete
}: CategoryItemProps): React.JSX.Element {
    return (
        <TableRow hover key={category.id}>
            <TableCell>{category.id}</TableCell>
            <TableCell>{category.name}</TableCell>
            <TableCell>
                <Switch
                    checked={category.show_on_pc === 1 ? true : false}
                    onChange={handleChangePC(category.id)}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </TableCell>
            <TableCell>
                <Switch
                    checked={category.show_on_mb === 1 ? true : false}
                    onChange={handleChangeMB(category.id)}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </TableCell>
            <TableCell>{dayjs(category.created_at).format('HH:mm:ss DD/MM/YYYY')}</TableCell>
            <TableCell>
                <Button
                    onClick={() => onDelete(category)}
                    type='button'
                    color="error"
                    sx={{
                        minWidth: "50px",
                        borderRadius: "5px",
                        backgroundColor: 'rgba(255, 0, 0, 0.2)',
                        '&:hover': { backgroundColor: 'rgba(255, 0, 0, 0.5)' }
                    }}
                >
                    Xóa
                </Button>
            </TableCell>
        </TableRow>
    );
}