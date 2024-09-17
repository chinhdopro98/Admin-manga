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
import { IAuthor, IType } from '@/redux/interfaces/interfaces';
function noop(): void {
  // do nothing
}
interface TypeMangaTableProps {
  count?: number;
  page?: number;
  types?: IType[];
  rowsPerPage?: number;
}

function handlePageChange(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number): void {
  console.log('Trang mới:', newPage);
}

export function TypeMangaTable({
  count = 0,
  types = [],
  page = 0,
  rowsPerPage = 0,
}: TypeMangaTableProps): React.JSX.Element {
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên kiểu truyện</TableCell>
              <TableCell>Tạo bới</TableCell>
              <TableCell>Tạo lúc</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {types.map((type) => {
              console.log(type, 21312312)
              return (
                <TableRow hover key={type.id} >
                  <TableCell>{type.id}</TableCell>
                  <TableCell>{type.name}</TableCell>
                  <TableCell>{type?.user?.name}</TableCell>
                  <TableCell>
                    {type.created_at ? dayjs(type.created_at).format('HH:mm:ss DD/MM/YYYY') : null}
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
