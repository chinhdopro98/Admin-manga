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
  onChange: (selectedCategories: ICategory[]) => void;
  sx?: React.CSSProperties;
}

export const MangaCategoryForm: React.FC<MangaCategoryProps> = ({ props = [], onChange, sx }) => {
  const categories = useAppSelector((state: RootState) => state.category.categories || []);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(selectAllCategories());
  }, [dispatch]);

  const selectedCategoryIds = props ? new Set(props.map(category => category?.id ?? -1)) : new Set<number>();

  const handleCheckboxChange = (categoryId: number) => {
    const updatedSelectedIds = new Set(selectedCategoryIds);

    if (updatedSelectedIds.has(categoryId)) {
      updatedSelectedIds.delete(categoryId);
    } else {
      updatedSelectedIds.add(categoryId);
    }

    const updatedCategories = categories
      .filter(category => category && updatedSelectedIds.has(category.id)); // Ensure no null categories
    onChange(updatedCategories);
  };

  return (
    <Box sx={sx}>
      <InputLabel sx={{ fontSize: "15px", mb: "3px", color: "#000" }}>Thể loại</InputLabel>
      <FormControl component="fieldset">
        <FormGroup row>
          {categories.map((category) => (
            category && (
              <FormControlLabel
                key={category.id}
                control={
                  <Checkbox
                    checked={selectedCategoryIds.has(category.id)}
                    onChange={() => handleCheckboxChange(category.id)}
                    sx={{
                      transform: 'scale(0.9)',
                      padding: '3px',
                      ml: 1
                    }}
                  />
                }
                label={category.name}
                sx={{ fontSize: '14px', mr: '8px' }}
              />
            )
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
};