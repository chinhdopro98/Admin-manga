import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import { ICategory } from '@/redux/interfaces/interfaces';
import { CategoryItem } from './category-item';
import { useAppDispatch } from '@/hooks/use-hook-redux';
import { changeShowOnMB, changeShowOnPC, deleteCategory } from '@/redux/actions/category';
import { changeStateShowMB, changeStateShowPC } from '@/redux/reducers/category';

interface CategoryListProps {
  count?: number;
  page?: number;
  categories?: ICategory[];
  rowsPerPage?: number;
  onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  toggleBgDark?: () => void;
  onDeleteItem?: (category: ICategory) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  count = 0,
  categories = [],
  page = 0,
  rowsPerPage = 0,
  onPageChange = () => { },
  onRowsPerPageChange = () => { },
  toggleBgDark = () => { },
  onDeleteItem = () => { }
}: CategoryListProps) => {
  const dispatch = useAppDispatch();
  const handleChangePC = (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleBgDark();
    dispatch(changeStateShowPC({ id, value: event.target.checked }))
    dispatch(changeShowOnPC({ id, show_on_pc: event.target.checked }))
  };

  const handleChangeMB = (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleBgDark();
    dispatch(changeStateShowMB({ id, value: event.target.checked }))
    dispatch(changeShowOnMB({ id, show_on_mb: event.target.checked }));
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
            {categories.map((category) => (
              <CategoryItem
                onDelete={onDeleteItem}
                key={category.id}
                category={category}
                handleChangePC={handleChangePC}
                handleChangeMB={handleChangeMB}
              />
            ))}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      {/* <TablePagination
        component="div"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
    </Card>
  )
};

export default React.memo(CategoryList, (prevProps, nextProps) => {
  return (
    prevProps.count === nextProps.count &&
    prevProps.page === nextProps.page &&
    prevProps.rowsPerPage === nextProps.rowsPerPage &&
    prevProps.categories === nextProps.categories
  );
});