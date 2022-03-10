import {Controller} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import {CCControlledTextInputProps, CCFormTextInputProps} from '../../types/FormInputProps';

export const CCFormText = ({name, control, label, textFieldProps, onValueChanged}: CCFormTextInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
                 field: {onChange, value},
                 fieldState: {error},
               }) => (
        <TextField
          value={value === null || value === undefined ? '' : value}
          onChange={e => {
            onChange(e);
            if (onValueChanged) {
              onValueChanged(e.target.value);
            }
          }}
          {...textFieldProps}
          helperText={error ? error.message : textFieldProps?.helperText}
          type={textFieldProps?.type ?? 'text'}
          size={textFieldProps?.size ?? 'small'}
          error={!!error}
          fullWidth={textFieldProps?.fullWidth ?? true}
          label={label}
          variant={textFieldProps?.variant ?? 'standard'}
        />
      )}
    />
  );
};

export const CCControlledText = ({value, onChange, label, textFieldProps}: CCControlledTextInputProps) => {
  return (
    <TextField
      value={value === null || value === undefined ? '' : value}
      onChange={onChange}
      {...textFieldProps}
      helperText={textFieldProps?.helperText}
      type={textFieldProps?.type ?? 'text'}
      size={textFieldProps?.size ?? 'small'}
      fullWidth={textFieldProps?.fullWidth ?? true}
      label={label}
      variant={textFieldProps?.variant ?? 'standard'}
    />
  );
};
