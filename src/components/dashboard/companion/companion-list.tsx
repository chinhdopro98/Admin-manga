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
import { ICompanion } from '@/redux/interfaces/interfaces';
import { CompanionItem } from './companion-item';

function noop(): void {
    // do nothing
}

interface CompanionListProps {
    count?: number;
    page?: number;
    companions?: ICompanion[];
    rowsPerPage?: number;
    onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    toggleBgDark?: () => void;
    onDeleteItem?: (companion: ICompanion) => void;
    onUpdateItem?: (companion: ICompanion) => void;
}

function handlePageChange(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number): void {
    console.log('Trang mới:', newPage);
}

const CompanionList: React.FC<CompanionListProps> = ({
    count = 0,
    companions = [],
    page = 0,
    rowsPerPage = 0,
    onPageChange = () => { },
    onRowsPerPageChange = () => { },
    toggleBgDark = () => { },
    onDeleteItem = () => { },
    onUpdateItem = () => { }
}: CompanionListProps) => {
    return (
        <Card>
            <Box sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: '800px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Preview</TableCell>
                            <TableCell>Tên bạn đồng hành</TableCell>
                            <TableCell>Giá</TableCell>
                            <TableCell>Tạo bởi</TableCell>
                            <TableCell>Tạo lúc</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companions.map((companion) => (
                            <CompanionItem key={companion.id} companion={companion} onDelete={onDeleteItem} onUpdate={onUpdateItem} />
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

export default React.memo(CompanionList, (prevProps, nextProps) => {
    return (
        prevProps.count === nextProps.count &&
        prevProps.page === nextProps.page &&
        prevProps.rowsPerPage === nextProps.rowsPerPage &&
        prevProps.companions === nextProps.companions
    );
});