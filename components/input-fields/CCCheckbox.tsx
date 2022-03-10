import {Checkbox, FormControl, FormControlLabel} from '@mui/material';
import {Controller} from 'react-hook-form';
import {CCControlledCheckboxProps, CCFormCheckboxProps} from '../../types/FormInputProps';

export const CCFormCheckbox = (
  {name, control, label, onValueChanged, formControlProps, formControlLabelProps, checkboxProps}: CCFormCheckboxProps
) => {

  return (
    <FormControl
      {...formControlProps}
      size={formControlProps?.size ?? 'small'}
      variant={formControlProps?.variant ?? 'outlined'}
    >
      <FormControlLabel
        {...formControlLabelProps}
        label={label!}
        control={
          <Controller
            name={name}
            control={control}
            render={({
                       field: {onChange, value},
                     }) => (
              <Checkbox
                {...checkboxProps}
                checked={value ?? false}
                onChange={e => {
                  onChange(e);
                  if (onValueChanged) {
                    onValueChanged(e.target.checked);
                  }
                }}
              />
            )}
          />
        }
      />
    </FormControl>
  );
};

export const CCControlledCheckbox = (
  {checked, onChange, label, formControlProps, formControlLabelProps, checkboxProps}: CCControlledCheckboxProps
) => {

  return (
    <FormControl
      {...formControlProps}
      size={formControlProps?.size ?? 'small'}
      variant={formControlProps?.variant ?? 'outlined'}
    >
      <FormControlLabel
        {...formControlLabelProps}
        label={label!}
        control={
          <Checkbox
            {...checkboxProps}
            checked={checked}
            onChange={onChange}
          />
        }
      />
    </FormControl>
  );
};
