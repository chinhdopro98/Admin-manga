'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { ICategory } from '@/redux/interfaces/interfaces';
import Switch from '@mui/material/Switch';
function noop(): void {
  // do nothing
}
interface CategoryTableProps {
  count?: number;
  page?: number;
  categories?: ICategory[];
  rowsPerPage?: number;
}

function handlePageChange(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number): void {
  // Xử lý logic chuyển trang, ví dụ: cập nhật state page
  console.log('Trang mới:', newPage);
}

export function CategoriesTable({
  count = 0,
  categories = [],
  page = 0,
  rowsPerPage = 0,
}: CategoryTableProps): React.JSX.Element {
  const [checkedStatePCs, setCheckedStatePCs] = React.useState<{ [key: number]: boolean }>(
    () => {
      const initialStates: { [key: number]: boolean } = {};
      categories.forEach((category) => {
        initialStates[category.id] = category.show_on_pc === 1;
      });
      return initialStates;
    }
  );
  const [checkedStateMBs, setCheckedStateMBs] = React.useState<{ [key: number]: boolean }>(
    () => {
      const initialStates: { [key: number]: boolean } = {};
      categories.forEach((category) => {
        initialStates[category.id] = category.show_on_mb === 1;
      });
      return initialStates;
    }
  );
  const handleChangePC = (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedStatePCs((prevStates) => ({
      ...prevStates,
      [id]: event.target.checked,
    }));
  };

  const handleChangeMB = (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedStateMBs((prevStates) => ({
      ...prevStates,
      [id]: event.target.checked,
    }));
  };

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên thể loại</TableCell>
              <TableCell>Hiện trên PC</TableCell>
              <TableCell>Hiện trên MB</TableCell>
              <TableCell>Tạo lúc</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => {
              return (
                <TableRow hover key={category.id} >
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell><Switch
                    checked={checkedStatePCs[category.id] || false}
                    onChange={handleChangePC(category.id)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                  </TableCell>
                  <TableCell><Switch
                    checked={checkedStateMBs[category.id] || false}
                    onChange={handleChangeMB(category.id)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                  </TableCell>
                  <TableCell>{category.show_on_mb}</TableCell>
                  <TableCell>
                    {category.created_at ? dayjs(category.created_at).format('HH:mm:ss DD/MM/YYYY') : null}
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
