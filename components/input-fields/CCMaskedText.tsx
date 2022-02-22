import {Controller} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import InputMask from 'react-input-mask';
import {CCMaskedTextInputProps} from '../../types/FormInputProps';

export const CCMaskedText = (
  {name, control, label, mask, maskChar, onValueChanged, textFieldProps, inputMaskProps}: CCMaskedTextInputProps
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
