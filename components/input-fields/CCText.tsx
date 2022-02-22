import {Controller} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import {CCTextInputProps} from '../../types/FormInputProps';

export const CCText = ({name, control, label, textFieldProps, onValueChanged}: CCTextInputProps) => {
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
