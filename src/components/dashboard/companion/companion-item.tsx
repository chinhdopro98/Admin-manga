import * as React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import dayjs from 'dayjs';
import { ICompanion } from '@/redux/interfaces/interfaces';
import { Box, Button, Typography } from '@mui/material';
import { PencilSimple, Trash } from '@phosphor-icons/react/dist/ssr';

interface CompanionItemProps {
    companion: ICompanion;
    onDelete: (companion: ICompanion) => void;
    onUpdate: (companion: ICompanion) => void;
}

export const CompanionItem: React.FC<CompanionItemProps> = ({ companion, onDelete, onUpdate }: CompanionItemProps) => {
    return (
        <TableRow hover key={companion.id}>
            <TableCell sx={{ width: "100px", border: "none" }}>
                <Box sx={{ lineHeight: "100px", height: "100px" }} >
                    {companion?.image_full_url ? (
                        <img
                            src={companion?.image_full_url}
                            alt={companion?.image_full_url}
                            style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                            }}
                        />
                    ) : (
                        <Typography component="span" sx={{ color: "#635bff" }}>
                            No Image
                        </Typography>
                    )}
                </Box>
            </TableCell>
            <TableCell>{companion?.name}</TableCell>
            <TableCell>{companion?.price}</TableCell>
            <TableCell>{companion?.user?.name}</TableCell>
            <TableCell>
                {companion.created_at ? dayjs(companion.created_at).format('HH:mm:ss DD/MM/YYYY') : null}
            </TableCell>
            <TableCell>
                <Button
                    variant="outlined"
                    sx={{ minWidth: "40px", p: 0, height: "30px", borderRadius: "5px", mr: 1 }}
                    onClick={() => onUpdate(companion)}
                >
                    <PencilSimple size={16} />
                </Button>
                <Button
                    variant="outlined"
                    sx={{ minWidth: "40px", p: 0, height: "30px", borderRadius: "5px", borderColor: "red" }}
                    onClick={() => onDelete(companion)}
                >
                    <Trash size={16} style={{ color: "red" }} />
                </Button>
            </TableCell>
        </TableRow >
    );
}