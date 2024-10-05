import * as React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import dayjs from 'dayjs';
import { IAuthor } from '@/redux/interfaces/interfaces';
import { Button } from '@mui/material';
import { PencilSimple, Trash } from '@phosphor-icons/react/dist/ssr';

interface AuthorItemProps {
    author: IAuthor;
    onDelete: (author: IAuthor) => void;
    onUpdate: (author: IAuthor) => void;
}
export const AuthorItem: React.FC<AuthorItemProps> = ({ author, onDelete, onUpdate }: AuthorItemProps) => {
    return (
        <TableRow hover key={author.id}>
            <TableCell>{author.id}</TableCell>
            <TableCell>{author.name}</TableCell>
            <TableCell>{author?.user?.name}</TableCell>
            <TableCell>
                {author.created_at ? dayjs(author.created_at).format('HH:mm:ss DD/MM/YYYY') : null}
            </TableCell>
            <TableCell>
                <Button
                    variant="outlined"
                    sx={{ minWidth: "40px", p: 0, height: "30px", borderRadius: "5px", mr: 1 }}
                    onClick={() => onUpdate(author)}
                >
                    <PencilSimple size={16} />
                </Button>
                <Button
                    variant="outlined"
                    sx={{ minWidth: "40px", p: 0, height: "30px", borderRadius: "5px", borderColor: "red" }}
                    onClick={() => onDelete(author)}
                >
                    <Trash size={16} style={{ color: "red" }} />
                </Button>
            </TableCell>
        </TableRow >
    );
}