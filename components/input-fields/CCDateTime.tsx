import {Controller} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import {DateTimePicker} from '@mui/lab';
import {FormHelperText} from '@mui/material';
import {CCControlledDateTimePickerProps, CCFormDateTimePickerProps} from '../../types/FormInputProps';

export const CCFormDateTime = (
  {name, control, label, helperText, onValueChanged, dateTimePickerProps, textFieldProps}: CCFormDateTimePickerProps
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
            views={dateTimePickerProps?.views ?? ['day', 'hours', 'minutes']}
            inputFormat={dateTimePickerProps?.inputFormat ?? 'yyyy.MM.DD. HH:mm'}
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

export const CCControlledDateTime = (
  {value, onChange, label, helperText, dateTimePickerProps, textFieldProps}: CCControlledDateTimePickerProps
) => {
  return (
    <>
      {/*@ts-ignore*/}
      <DateTimePicker
        {...dateTimePickerProps}
        value={value}
        onChange={onChange}
        label={label}
        views={dateTimePickerProps?.views ?? ['day', 'hours', 'minutes', 'seconds']}
        inputFormat={dateTimePickerProps?.inputFormat ?? 'yyyy.MM.DD. HH:mm:ss'}
        mask={dateTimePickerProps?.mask ?? '____.__.__. __:__:__'}
        renderInput={(params) =>
          <TextField
            {...params}
            {...textFieldProps}
            fullWidth={textFieldProps?.fullWidth ?? true}
            size={textFieldProps?.size ?? 'small'}
            label={label}
            variant={textFieldProps?.variant ?? 'standard'}
          />}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </>
  );
};
