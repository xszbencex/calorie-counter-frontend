import {Controller} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import {DateTimePicker} from '@mui/lab';
import {FormHelperText} from '@mui/material';
import {CCDateTimePickerProps} from '../../types/FormInputProps';

export const CCDateTime = (
  {name, control, label, helperText, onValueChanged, dateTimePickerProps, textFieldProps}: CCDateTimePickerProps
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
          <DateTimePicker
            {...dateTimePickerProps}
            value={value === undefined ? null : value}
            onChange={newValue => {
              onChange(newValue);
              if (onValueChanged) {
                onValueChanged(newValue);
              }
            }}
            label={label}
            mask={dateTimePickerProps?.mask ?? '____.__.__. __:__'}
            renderInput={(params) =>
              <TextField
                {...params}
                {...textFieldProps}
                fullWidth={textFieldProps?.fullWidth ?? true}
                size={textFieldProps?.size ?? 'small'}
                label={label}
                variant={textFieldProps?.variant ?? 'standard'}
                error={!!error}
              />}
          />
          <FormHelperText error={!!error}>{error ? error.message : helperText}</FormHelperText>
        </>
      )}
    />
  );
};
