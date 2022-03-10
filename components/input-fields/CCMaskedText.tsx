import {Controller} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import InputMask from 'react-input-mask';
import {CCControlledMaskedTextProps, CCFormMaskedTextProps} from '../../types/FormInputProps';

export const CCFormMaskedText = (
  {name, control, label, mask, maskChar, onValueChanged, textFieldProps, inputMaskProps}: CCFormMaskedTextProps
) => {

  return (
    <Controller
      name={name}
      control={control}
      render={({
                 field: {onChange, value},
                 fieldState: {error},
               }) => (
        <InputMask
          mask={mask!}
          {...inputMaskProps}
          // @ts-ignore
          maskChar={maskChar ?? null}
          onChange={(e: any) => {
            onChange(e);
            if (onValueChanged) {
              onValueChanged(e.target.value);
            }
          }}
          value={value === null || value === undefined ? '' : value}>
          {(inputProps: any) =>
            <TextField
              {...inputProps}
              {...textFieldProps}
              helperText={error ? error.message : textFieldProps?.helperText}
              size={textFieldProps?.size ?? 'small'}
              error={!!error}
              fullWidth={textFieldProps?.fullWidth ?? true}
              label={label}
              variant={textFieldProps?.variant ?? 'standard'}
            />
          }
        </InputMask>
      )}
    />
  );
};

export const CCControlledMaskedText = (
  {value, onChange, label, mask, maskChar, textFieldProps, inputMaskProps}: CCControlledMaskedTextProps
) => {

  return (
    <InputMask
      mask={mask!}
      {...inputMaskProps}
      // @ts-ignore
      maskChar={maskChar ?? null}
      onChange={onChange}
      value={value}>
      {(inputProps: any) =>
        <TextField
          {...inputProps}
          {...textFieldProps}
          helperText={textFieldProps?.helperText}
          size={textFieldProps?.size ?? 'small'}
          fullWidth={textFieldProps?.fullWidth ?? true}
          label={label}
          variant={textFieldProps?.variant ?? 'standard'}
        />
      }
    </InputMask>
  );
};
