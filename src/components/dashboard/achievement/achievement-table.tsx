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
import { IAchievement } from '@/redux/interfaces/interfaces';
function noop(): void {
  // do nothing
}
interface AchievementTableProps {
  count?: number;
  page?: number;
  achievements?: IAchievement[];
  rowsPerPage?: number;
}

function handlePageChange(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number): void {
  console.log('Trang mới:', newPage);
}

export function AchievementsTable({
  count = 0,
  achievements = [],
  page = 0,
  rowsPerPage = 0,
}: AchievementTableProps): React.JSX.Element {
  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Preview</TableCell>
              <TableCell>Tạo bởi</TableCell>
              <TableCell>Điểm</TableCell>
              <TableCell>Tạo lúc</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {achievements.map((achievement) => {
              return (
                <TableRow hover key={achievement.id} >
                  <TableCell>{achievement.id}</TableCell>
                  <TableCell>{achievement.name}</TableCell>
                  <TableCell>{achievement?.user?.name}</TableCell>
                  <TableCell>{achievement?.required_points}</TableCell>
                  <TableCell>
                    {achievement.created_at ? dayjs(achievement.created_at).format('HH:mm:ss DD/MM/YYYY') : null}
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
