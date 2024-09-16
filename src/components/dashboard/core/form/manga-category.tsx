
import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const categories = [
  { label: 'Action', defaultChecked: true },
  { label: 'Adventure', required: true },
  { label: 'Fantasy', disabled: true },
  { label: 'Romance' },
];

export const MangaCategoryCheckBoxes: React.FC = () => {
  return (
    <FormGroup row> {/* Use row prop to arrange checkboxes horizontally */}
      {categories.map((category, index) => (
        <FormControlLabel
          key={index}
          control={<Checkbox defaultChecked={category.defaultChecked} required={category.required} disabled={category.disabled} />}
          label={category.label}
        />
      ))}
    </FormGroup>
  );
};
