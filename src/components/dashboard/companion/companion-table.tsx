'use client';

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
import dayjs from 'dayjs';
import { ICompanion } from '@/redux/interfaces/interfaces';
function noop(): void {
  // do nothing
}
interface CompanionTableProps {
  count?: number;
  page?: number;
  companions?: ICompanion[];
  rowsPerPage?: number;
}

function handlePageChange(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number): void {
  console.log('Trang mới:', newPage);
}

export function CompanionsTable({
  count = 0,
  companions = [],
  page = 0,
  rowsPerPage = 0,
}: CompanionTableProps): React.JSX.Element {
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
            {companions.map((companion) => {
              return (
                <TableRow hover key={companion.id} >
                  <TableCell>{companion.id}</TableCell>
                  <TableCell>{companion.name}</TableCell>
                  <TableCell>{companion.price}</TableCell>
                  <TableCell>{companion?.user?.name}</TableCell>
                  <TableCell>
                    {companion.created_at ? dayjs(companion.created_at).format('HH:mm:ss DD/MM/YYYY') : null}
                  </TableCell>
                  <TableCell>1</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={handlePageChange}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25,]}
      />
    </Card>
  );
}
