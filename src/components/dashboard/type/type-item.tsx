import * as React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import dayjs from 'dayjs';
import { IType } from '@/redux/interfaces/interfaces';
import { Button } from '@mui/material';
import { PencilSimple, Trash } from '@phosphor-icons/react/dist/ssr';

interface AuthorItemProps {
    type: IType;
    onDelete: (type: IType) => void;
    onUpdate: (type: IType) => void;
}
export const TypeItem: React.FC<AuthorItemProps> = ({ type, onDelete, onUpdate }: AuthorItemProps) => {
    return (
        <TableRow hover key={type.id}>
            <TableCell>{type.id}</TableCell>
            <TableCell>{type.name}</TableCell>
            <TableCell>{type?.user?.name}</TableCell>
            <TableCell>
                {type.created_at ? dayjs(type.created_at).format('HH:mm:ss DD/MM/YYYY') : null}
            </TableCell>
            <TableCell>
                <Button
                    variant="outlined"
                    sx={{ minWidth: "40px", p: 0, height: "30px", borderRadius: "5px", mr: 1 }}
                    onClick={() => onUpdate(type)}
                >
                    <PencilSimple size={16} />
                </Button>
                <Button
                    variant="outlined"
                    sx={{ minWidth: "40px", p: 0, height: "30px", borderRadius: "5px", borderColor: "red" }}
                    onClick={() => onDelete(type)}
                >
                    <Trash size={16} style={{ color: "red" }} />
                </Button>
            </TableCell>
        </TableRow >
    );
}