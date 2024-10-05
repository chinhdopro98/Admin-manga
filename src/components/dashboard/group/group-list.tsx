import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { GroupItem } from './group-item';
import { IGroup } from '@/redux/interfaces/interfaces';

function noop(): void {
    // do nothing
}

interface GroupListProps {
    count?: number;
    page?: number;
    groups?: IGroup[];
    rowsPerPage?: number;
    onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    toggleBgDark?: () => void;
    onDeleteItem?: (group: IGroup) => void;
    onUpdateItem?: (group: IGroup) => void;
}

function handlePageChange(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number): void {
    console.log('Trang mới:', newPage);
}

const GroupList: React.FC<GroupListProps> = ({
    count = 0,
    groups = [],
    page = 0,
    rowsPerPage = 0,
    onPageChange = () => { },
    onRowsPerPageChange = () => { },
    toggleBgDark = () => { },
    onDeleteItem = () => { },
    onUpdateItem = () => { }
}: GroupListProps) => {
    return (
        <Card>
            <Box sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: '800px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '30%' }}>ID</TableCell>
                            <TableCell>Tên nhóm</TableCell>
                            <TableCell>Tạo bới</TableCell>
                            <TableCell>Tạo lúc</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {groups.map((group) => (
                            <GroupItem key={group.id} group={group} onDelete={onDeleteItem} onUpdate={onUpdateItem} />
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <Divider />
            {/* <TablePagination
                component="div"
                count={count}
                onPageChange={handlePageChange}
                onRowsPerPageChange={noop}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            /> */}
        </Card>
    );
}

export default React.memo(GroupList, (prevProps, nextProps) => {
    return (
        prevProps.count === nextProps.count &&
        prevProps.page === nextProps.page &&
        prevProps.rowsPerPage === nextProps.rowsPerPage &&
        prevProps.groups === nextProps.groups
    );
});