import {Controller} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import {DatePicker} from '@mui/lab';
import {FormHelperText} from '@mui/material';
import {CCDatePickerProps} from '../../types/FormInputProps';

export const CCDate = (
  {name, control, label, isBirthDatePicker, helperText, onValueChanged, datePickerProps, textFieldProps}: CCDatePickerProps
) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
                 field: {onChange, value},
                 fieldState: {error},
               }) => (
        <>
          <DatePicker
            {...datePickerProps}
            value={value === undefined || value === '' ? null : value}
            onChange={newValue => {
              onChange(newValue);
              if (onValueChanged) {
                onValueChanged(newValue);
              }
            }}
            label={label}
            mask={datePickerProps?.mask ?? '____.__.__.'}
            openTo={datePickerProps?.openTo ?? isBirthDatePicker ? 'year' : 'day'}
            views={datePickerProps?.views ?? isBirthDatePicker ? ['year', 'month', 'day'] : ['year', 'day']} // A month errort dob
            renderInput={(params) =>
              <TextField
                {...params}
                {...textFieldProps}
                fullWidth={textFieldProps?.fullWidth ?? true}
                size={textFieldProps?.size ?? 'small'}
                label={label}
                variant={textFieldProps?.variant ?? 'standard'}
                error={!!error}
              />
            }
          />
          <FormHelperText error={!!error}>{error ? error.message : helperText}</FormHelperText>
        </>
      )}
    />
  );
};
