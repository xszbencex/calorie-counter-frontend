import {Checkbox, FormControl, FormHelperText, InputLabel, ListItemText, MenuItem, Select} from '@mui/material';
import {Controller} from 'react-hook-form';
import {CCSelectProps} from '../../types/FormInputProps';
import {EnumLabels} from '../../constants/enum-labels';

export const CCSelect = (
  {
    name, control, label, options, helperText, getOptionLabel, clearable, multiple, onValueChanged, formControlProps, selectProps
  }: CCSelectProps
) => {

  const nullValue = multiple ? [] : '';

  const optionalRenderValueProp = {...(multiple && {
      renderValue: (selected: any) => {
        const mappedSelected = selected.map((value: string) => {
          const foundOption = options.find(option => option.id === value || option.value === value);
          return getOptionLabel ? getOptionLabel(foundOption) : foundOption.label ?? foundOption.name;
        });
        return mappedSelected.join(', ');
      }
    })};

  const generateSingleOptions = (formFieldValue: any) => {
    return options?.map((option: EnumLabels | any) => {
      const value = option.value ?? option.id;
      const label = getOptionLabel ? getOptionLabel(option) : option.label ?? option.name;
      return (
        <MenuItem key={value} value={value}>
          {multiple ? (
            <>
              <Checkbox checked={formFieldValue.includes(value)} />
              <ListItemText primary={label} />
            </>
          ) : label}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl
      {...formControlProps}
      size={formControlProps?.size ?? 'small'}
      variant={formControlProps?.variant ?? 'standard'}
      fullWidth={formControlProps?.fullWidth ?? true}
    >
      <Controller
        control={control}
        name={name}
        render={({
                   field: {onChange, value},
                   fieldState: {error}
                 }) => (
          <>
            <InputLabel error={!!error}>{label}</InputLabel>
            <Select
              {...selectProps}
              onChange={e => {
                onChange(e);
                if (onValueChanged) {
                  onValueChanged(e.target.value);
                }
              }}
              value={value === null || value === undefined || options?.length === 0 ? nullValue : value}
              error={!!error}
              multiple={multiple}
              {...optionalRenderValueProp}
            >
              {clearable && !multiple && (
                <MenuItem value="">Egyik sem</MenuItem>
              )}
              {generateSingleOptions(value)}
            </Select>
            <FormHelperText error={!!error}>{error ? error.message : helperText}</FormHelperText>
          </>
        )}
      />
    </FormControl>
  );
};
