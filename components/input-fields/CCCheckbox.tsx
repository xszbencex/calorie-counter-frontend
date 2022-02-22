import {Checkbox, FormControl, FormControlLabel} from '@mui/material';
import {Controller} from 'react-hook-form';
import {CCCheckboxProps} from '../../types/FormInputProps';

export const CCCheckbox = (
  {name, control, label, onValueChanged, formControlProps, formControlLabelProps, checkboxProps}: CCCheckboxProps
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
