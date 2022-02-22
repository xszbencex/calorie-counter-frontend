import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, } from '@mui/material';
import {Controller} from 'react-hook-form';
import {CCRadioButtonProps} from '../../types/FormInputProps';

export const CCRadioButtons = (
  {name, control, label, options, onValueChanged, getOptionLabel, row}: CCRadioButtonProps
) => {
  const generateRadioOptions = () => {
    return options?.map((option, index) => (
      <FormControlLabel
        key={index}
        value={option.value}
        label={getOptionLabel ? getOptionLabel(option) : option.label}
        control={<Radio/>}
      />
    ));
  };

  return (
    <FormControl component="fieldset">
      {!!label && <FormLabel component="legend">{label}</FormLabel>}
      <Controller
        name={name}
        control={control}
        render={({
                   field: {onChange, value},
                   fieldState: {error},
                 }) => (
          <RadioGroup
            value={value}
            onChange={e => {
              onChange(e);
              if (onValueChanged) {
                onValueChanged(e.target.value);
              }
            }}
            row={row ? row : false}
          >
            {generateRadioOptions()}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};
