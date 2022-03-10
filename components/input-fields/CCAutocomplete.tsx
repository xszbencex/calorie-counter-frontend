import {Controller} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import {Autocomplete, Checkbox} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {CCControlledAutocompleteProps, CCFormAutocompleteProps} from '../../types/FormInputProps';

export const CCFormAutocomplete = (
  {name, control, label, options, getOptionLabel, onValueChanged, multiple, textFieldProps, autocompleteProps}: CCFormAutocompleteProps
) => {

  const emptyValue = multiple ? [] : null;

  return (
    <Controller
      name={name}
      control={control}
      render={({
                 field: {onChange, value},
                 fieldState: {error}
               }) => (
        <Autocomplete
          {...autocompleteProps}
          autoHighlight={autocompleteProps?.autoHighlight ?? true}
          multiple={multiple}
          disableCloseOnSelect={multiple}
          value={value === null || value === undefined || value === '' || !value?.id ? emptyValue : value}
          onChange={(_, data) => {
            onChange(data === null ? emptyValue : data);
            if (onValueChanged) {
              onValueChanged(data);
            }
          }}
          options={options ?? []}
          getOptionLabel={option => {
            if (option?.id) {
              return getOptionLabel ? getOptionLabel(option) : '';
            }
            return '';
          }}
          isOptionEqualToValue={(option, currentValue) => option?.id === currentValue?.id}
          renderInput={(params) =>
            <TextField
              {...params}
              {...textFieldProps}
              error={!!error}
              helperText={error ? error.message : textFieldProps?.helperText}
              size={textFieldProps?.size ?? 'small'}
              label={label}
              variant={textFieldProps?.variant ?? 'standard'}
              autoComplete="disabled"
            />}
          renderOption={multiple ? (props, option, {selected}) => (
            <li {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="medium"/>}
                checkedIcon={<CheckBoxIcon fontSize="medium"/>}
                style={{marginRight: 8}}
                checked={selected}
              />
              {getOptionLabel ? getOptionLabel(option) : ''}
            </li>
          ) : undefined}
        />
      )}
    />
  );
};

export const CCControlledAutocomplete = (
  {value, onChange, label, options, getOptionLabel, multiple, textFieldProps, autocompleteProps}: CCControlledAutocompleteProps
) => {

  const emptyValue = multiple ? [] : null;

  return (
    <Autocomplete
      {...autocompleteProps}
      autoHighlight={autocompleteProps?.autoHighlight ?? true}
      multiple={multiple}
      disableCloseOnSelect={multiple}
      value={value === null || value === undefined ? emptyValue : value}
      onChange={onChange}
      options={options ?? []}
      getOptionLabel={option => {
        if (option?.id) {
          return getOptionLabel ? getOptionLabel(option) : '';
        }
        return '';
      }}
      isOptionEqualToValue={(option, currentValue) => option?.id === currentValue?.id}
      renderInput={(params) =>
        <TextField
          {...params}
          {...textFieldProps}
          helperText={textFieldProps?.helperText}
          size={textFieldProps?.size ?? 'small'}
          label={label}
          variant={textFieldProps?.variant ?? 'standard'}
          autoComplete="disabled"
        />}
      renderOption={multiple ? (props, option, {selected}) => (
        <li {...props}>
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="medium"/>}
            checkedIcon={<CheckBoxIcon fontSize="medium"/>}
            style={{marginRight: 8}}
            checked={selected}
          />
          {getOptionLabel ? getOptionLabel(option) : ''}
        </li>
      ) : undefined}
    />
  );
};
