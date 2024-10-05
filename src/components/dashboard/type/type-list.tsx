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
import { IType } from '@/redux/interfaces/interfaces';
import { TypeItem } from './type-item';

function noop(): void {
    // do nothing
}

interface TypeListProps {
    count?: number;
    page?: number;
    types?: IType[];
    rowsPerPage?: number;
    onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    toggleBgDark?: () => void;
    onDeleteItem?: (type: IType) => void;
    onUpdateItem?: (type: IType) => void;
}

function handlePageChange(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number): void {
    console.log('Trang mới:', newPage);
}

const TypeList: React.FC<TypeListProps> = ({
    count = 0,
    types = [],
    page = 0,
    rowsPerPage = 0,
    onPageChange = () => { },
    onRowsPerPageChange = () => { },
    toggleBgDark = () => { },
    onDeleteItem = () => { },
    onUpdateItem = () => { }
}: TypeListProps) => {
    return (
        <Card>
            <Box sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: '800px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: '30%' }}>ID</TableCell>
                            <TableCell>Tên Kiểu truyện</TableCell>
                            <TableCell>Tạo bới</TableCell>
                            <TableCell>Tạo lúc</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {types.map((type) => (
                            <TypeItem key={type.id} type={type} onDelete={onDeleteItem} onUpdate={onUpdateItem} />
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

export default React.memo(TypeList, (prevProps, nextProps) => {
    return (
        prevProps.count === nextProps.count &&
        prevProps.page === nextProps.page &&
        prevProps.rowsPerPage === nextProps.rowsPerPage &&
        prevProps.types === nextProps.types
    );
});