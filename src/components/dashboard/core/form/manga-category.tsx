
import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { selectAllCategories } from '@/redux/actions/category';
import { ICategory } from '@/redux/interfaces/interfaces';
import { Box, FormControl, InputLabel } from '@mui/material';

interface MangaCategoryProps {
  props?: ICategory[] | null;
  sx?: React.CSSProperties;
}

export const MangaCategoryForm: React.FC<MangaCategoryProps> = ({ props, sx }) => {
  const categories = useAppSelector((state: RootState) => state.category.categories);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(selectAllCategories());
  }, [dispatch]);
  const selectedCategoryIds = props ? new Set(props.map(category => category.id)) : new Set();
  const handleCheckboxChange = (categoryId: number) => {
  };

  return (
    <Box sx={sx}>
      <InputLabel sx={{ fontSize: "16px", mb: "5px", color: "#000" }}>Thể loại</InputLabel>
      <FormControl component="fieldset">
        <FormGroup row>
          {categories.map((category) => (
            <FormControlLabel
              key={category.id}
              control={
                <Checkbox
                  checked={selectedCategoryIds.has(category.id)}
                  onChange={() => handleCheckboxChange(category.id)}
                />
              }
              label={category.name}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
};
