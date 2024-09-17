
import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch, useAppSelector } from '@/hooks/use-hook-redux';
import { RootState } from '@/redux/stores';
import { selectAllCategories } from '@/redux/actions/category';
import { ICategory } from '@/redux/interfaces/interfaces';

interface MangaCategoryCheckBoxesProps {
  props?: ICategory[] | null;
}

export const MangaCategoryCheckBoxes: React.FC<MangaCategoryCheckBoxesProps> = ({ props }) => {
  const categories = useAppSelector((state: RootState) => state.category.categories);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(selectAllCategories());
  }, [dispatch]);
  const selectedCategoryIds = props ? new Set(props.map(category => category.id)) : new Set();

  const handleCheckboxChange = (categoryId: number) => {

  };

  return (
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
  );
};
