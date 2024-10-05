import * as React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import dayjs from 'dayjs';
import { IGroup } from '@/redux/interfaces/interfaces';
import { Button } from '@mui/material';
import { PencilSimple, Trash } from '@phosphor-icons/react/dist/ssr';

interface GroupItemProps {
    group: IGroup;
    onDelete: (group: IGroup) => void;
    onUpdate: (group: IGroup) => void;
}
export const GroupItem: React.FC<GroupItemProps> = ({ group, onDelete, onUpdate }: GroupItemProps) => {
    return (
        <TableRow hover key={group.id}>
            <TableCell>{group.id}</TableCell>
            <TableCell>{group.name}</TableCell>
            <TableCell>{group?.user?.name}</TableCell>
            <TableCell>
                {group.created_at ? dayjs(group.created_at).format('HH:mm:ss DD/MM/YYYY') : null}
            </TableCell>
            <TableCell>
                <Button
                    variant="outlined"
                    sx={{ minWidth: "40px", p: 0, height: "30px", borderRadius: "5px", mr: 1 }}
                    onClick={() => onUpdate(group)}
                >
                    <PencilSimple size={16} />
                </Button>
                <Button
                    variant="outlined"
                    sx={{ minWidth: "40px", p: 0, height: "30px", borderRadius: "5px", borderColor: "red" }}
                    onClick={() => onDelete(group)}
                >
                    <Trash size={16} style={{ color: "red" }} />
                </Button>
            </TableCell>
        </TableRow >
    );
}