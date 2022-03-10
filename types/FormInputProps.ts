import {EnumLabel} from '../constants/enum-label';
import {Control} from 'react-hook-form';
import {
    AutocompleteChangeDetails,
    AutocompleteChangeReason,
    AutocompleteProps,
    AutocompleteValue,
    CheckboxProps,
    FormControlLabelProps,
    FormControlProps, SelectChangeEvent,
    SelectProps,
    TextFieldProps
} from '@mui/material';
import {Props} from 'react-input-mask';
import {DatePickerProps, DateTimePickerProps} from '@mui/lab';
import React, {ChangeEvent, ReactNode} from 'react';
import {Moment} from 'moment';

type CCBaseFormInputProps = {
    /**
     * A form field neve a formban
     */
    name: string;

    /**
     * useForm-ból kapott control
     */
    control: Control<any, Object>;

    /**
     * Form field labelje
     */
    label?: string;

    /**
     * Ha az érték beállítás mellett valamilyen plusz logikát akarunk futtatni
     * az érték változás eventre.
     *
     * @param value az új érték
     */
    onValueChanged?: (value: any) => void;
}

type CCBaseControlledInputProps = {
    /**
     * Form field labelje
     */
    label?: string;
}

type CCTextInputProps = {
    /**
     * TextField komponens propertyk
     *
     * - [MUI TextField](https://mui.com/components/text-fields/) komponens használatának dokumentációja
     * - [MUI TextFieldProps](https://mui.com/api/text-field/) property dokumnetáció
     *
     * Leggyakrabban használt propertyk:
     * - disabled
     * - variant
     * - fullWidth
     * - helperText
     * - type
     * - size
     * - multiline (textarea esetén true)
     * - rows (textarea estén > 1)
     * - InputProps (a start- és endAdornment beállítására)
     */
    textFieldProps?: Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'error' | 'label'>;
}

type CCSelectProps = {
    /**
     * Az opciók tömbje
     */
    options: EnumLabel[] | any[];

    /**
     * Legördülőben egy elem megjelenítését megadó függvény.
     * Ha nincs megadva, akkor az option.label vagy option.name-et jeleníti meg.
     *
     * @param option
     */
    getOptionLabel?: (option: any) => string;

    /**
     * Ha szükség van üres opcióra
     */
    clearable?: boolean;

    /**
     * Multiple select-hez
     */
    multiple?: boolean;

    /**
     * Segítő szöveg (hint) megjelenítése.
     */
    helperText?: string;

    /**
     * FormControl komponens propertyk
     *
     * - [MUI FormControl](https://mui.com/api/form-control/#main-content) property dokumnetáció
     *
     * Leggyakrabban használt propertyk:
     * - disabled
     * - variant
     * - fullWidth
     * - size
     */
    formControlProps?: Omit<FormControlProps, 'error'>;

    /**
     * Select komponens propertyk
     *
     * - [MUI Select](https://mui.com/components/selects/) komponens használatának dokumentációja
     * - [MUI SelectProps](https://mui.com/api/select/) property dokumnetáció
     */
    selectProps?: Omit<SelectProps, 'name' | 'value' | 'onChange' | 'error' | 'multiple' | 'renderValue'>
}

type CCAutocompleteProps = {
    /**
     * Az opciók tömbje
     */
    options: EnumLabel[] | any[];

    /**
     * Legördülőben egy elem megjelenítését megadó függvény.
     *
     * @param option
     */
    getOptionLabel: (option: any) => string;

    /**
     * Multiple select-hez
     */
    multiple?: boolean;

    /**
     * TextField komponens propertyk
     *
     * - [MUI TextField](https://mui.com/components/text-fields/) komponens használatának dokumentációja
     * - [MUI TextFieldProps](https://mui.com/api/text-field/) property dokumnetáció
     *
     * Leggyakrabban használt propertyk:
     * - disabled
     * - variant
     * - fullWidth
     * - helperText
     * - type
     * - size
     * - InputProps (a start- és endAdornment beállítására)
     */
    textFieldProps?: Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'error' | 'label' | 'autoComplete'>;

    /**
     * Autocomplete komponens propertyk
     *
     * - [MUI Autocomplete](https://mui.com/components/autocomplete/) komponens használatának dokumentációja
     * - [MUI AutocompleteProps](https://mui.com/api/autocomplete/) property dokumnetáció
     *
     * Leggyakrabban használt propertyk:
     * - disabled
     * - variant
     * - fullWidth
     * - size
     */
    autocompleteProps?: Omit<AutocompleteProps<any, any, any, any>, 'multiple' | 'disableCloseOnSelect' | 'value' | 'onChange' | 'options'
      | 'getOptionLabel' | 'renderInput' | 'renderOption'>;
}

type CCMaskedTextProps = {
    /**
     * Mask megadása [react-input-mask doksi](https://www.npmjs.com/package/react-input-mask) alapján.
     */
    mask: string;

    /**
     * Karakter a mask ki nem töltött részének jelzésére.
     */
    maskChar?: string | null;

    /**
     * [react-input-mask](https://github.com/sanniassin/react-input-mask) library dokumentáció
     */
    inputMaskProps?: Omit<Props, 'mask'>;

    /**
     * TextField komponens propertyk
     *
     * - [MUI TextField](https://mui.com/components/text-fields/) komponens használatának dokumentációja
     * - [MUI TextFieldProps](https://mui.com/api/text-field/) property dokumnetáció
     *
     * Leggyakrabban használt propertyk:
     * - disabled
     * - variant
     * - fullWidth
     * - size
     * - InputProps (a start- és endAdornment beállítására)
     */
    textFieldProps?: Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'error' | 'label'>;
}

type CCDatePickerProps = {
    /**
     * Ha születési dátum kiválasztó akkor alapértelmezetten az évekkel kezd és van hónap választó.
     */
    isBirthDatePicker?: boolean;

    /**
     * Segítő szöveg (hint) megjelenítése.
     */
    helperText?: string;

    /**
     * DatePicker komponens propertyk
     *
     * - [MUI DatePicker](https://mui.com/components/date-picker/) komponens használatának dokumentációja
     * - [MUI DatePickerProps](https://mui.com/api/date-picker/) property dokumnetáció
     *
     * Leggyakrabban használt propertyk:
     * - disabled
     * - mask
     * - openTo
     * - minDate, maxDate
     */
    datePickerProps?: Omit<DatePickerProps, 'label' | 'onChange' | 'renderInput' | 'value'>

    /**
     * TextField komponens propertyk
     *
     * - [MUI TextField](https://mui.com/components/text-fields/) komponens használatának dokumentációja
     * - [MUI TextFieldProps](https://mui.com/api/text-field/) property dokumnetáció
     *
     * Leggyakrabban használt propertyk:
     * - disabled
     * - variant
     * - fullWidth
     * - size
     * - InputProps (a start- és endAdornment beállítására)
     */
    textFieldProps?: Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'error' | 'label' | 'disabled' | 'helperText'>;
}

type CCDateTimePickerProps = {
    /**
     * Segítő szöveg (hint) megjelenítése.
     */
    helperText?: string;

    /**
     * DateTimePicker komponens propertyk
     *
     * - [MUI DateTimePicker](https://mui.com/components/date-time-picker/#main-content) komponens használatának dokumentációja
     * - [MUI DateTimePickerProps](https://mui.com/api/date-time-picker/) property dokumnetáció
     *
     * Leggyakrabban használt propertyk:
     * - disabled
     * - mask
     * - openTo
     * - minDate, maxDate
     * - minTime, maxTime
     */
    dateTimePickerProps?: Omit<DateTimePickerProps, 'label' | 'onChange' | 'renderInput' | 'value'>

    /**
     * TextField komponens propertyk
     *
     * - [MUI TextField](https://mui.com/components/text-fields/) komponens használatának dokumentációja
     * - [MUI TextFieldProps](https://mui.com/api/text-field/) property dokumnetáció
     *
     * Leggyakrabban használt propertyk:
     * - disabled
     * - variant
     * - fullWidth
     * - size
     * - InputProps (a start- és endAdornment beállítására)
     */
    textFieldProps?: Omit<TextFieldProps, 'name' | 'value' | 'onChange' | 'error' | 'label' | 'disabled' | 'helperText'>;
}

type CCRadioButtonProps = {
    /**
     * Az opciók tömbje
     */
    options: EnumLabel[] | any[];

    /**
     * Radio button labelek megjelenítését megadó függvény.
     * Ha nem adjuk meg, akkor az option.label lesz.
     *
     * @param option
     */
    getOptionLabel?: (option: any) => string;

    /**
     * True ha vízszintes elrendezést akarunk, egyébként horizontális.
     */
    row?: boolean;
}

type CCCheckboxProps = {
    /**
     * Checkbox komponens propertyk
     *
     * - [MUI Checkbox](https://mui.com/components/checkboxes/#main-content) komponens használatának dokumentációja
     * - [MUI CheckboxProps](https://mui.com/api/checkbox/) property dokumentáció
     */
    checkboxProps?: Omit<CheckboxProps, 'name' | 'checked'>

    /**
     * FormControlLabel komponens propertyk
     *
     * - [MUI FormControlLabelProps](https://mui.com/api/form-control-label/) property dokumentáció
     *
     * Leggyakrabban használt propertyk:
     * - labelPlacement
     */
    formControlLabelProps?: Omit<FormControlLabelProps, 'name' | 'onChange' | 'control'>

    /**
     * FormControl komponens propertyk
     *
     * - [MUI FormControl](https://mui.com/api/form-control/#main-content) property dokumnetáció
     *
     * Leggyakrabban használt propertyk:
     * - disabled
     * - variant
     * - fullWidth
     * - size
     */
    formControlProps?: FormControlProps;
}

export type CCFormAutocompleteProps = CCBaseFormInputProps & CCAutocompleteProps;
export type CCFormTextInputProps = CCBaseFormInputProps & CCTextInputProps;
export type CCFormCheckboxProps = CCBaseFormInputProps & CCCheckboxProps;
export type CCFormMaskedTextProps = CCBaseFormInputProps & CCMaskedTextProps;
export type CCFormRadioButtonProps = CCBaseFormInputProps & CCRadioButtonProps;
export type CCFormSelectProps = CCBaseFormInputProps & CCSelectProps;
export type CCFormDatePickerProps = CCBaseFormInputProps & CCDatePickerProps;
export type CCFormDateTimePickerProps = CCBaseFormInputProps & CCDateTimePickerProps;

export type CCControlledAutocompleteProps = CCBaseControlledInputProps & CCAutocompleteProps & {

    value: AutocompleteValue<any, any, any, any>;

    /**
     * Value paraméter adja az értéket
     */
    onChange: (
      event: React.SyntheticEvent,
      value: AutocompleteValue<any, any, any, any>,
      reason: AutocompleteChangeReason,
      details?: AutocompleteChangeDetails<any>,
    ) => void;
}

export type CCControlledTextInputProps = CCBaseControlledInputProps & CCFormTextInputProps & {

    value: string | null;

    /**
     * event.target.value
     */
    onChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
};

export type CCControlledCheckboxProps = CCBaseControlledInputProps & CCCheckboxProps & {

    checked: boolean;

    /**
     * event.target.checked
     */
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type CCControlledMaskedTextProps = CCBaseControlledInputProps & CCMaskedTextProps & {

    value: string | number | readonly string[];

    /**
     * event.target.value
     */
    onChange: (event: ChangeEvent<any>) => void;
};

export type CCControlledRadioButtonProps = CCBaseControlledInputProps & CCRadioButtonProps & {

    value: string | any;

    /**
     * event.target.value vagy value
     */
    onChange: (event: ChangeEvent<any>, value: string) => void;
};

export type CCControlledSelectProps = CCBaseControlledInputProps & CCSelectProps & {

    value: any;

    /**
     * event.target.value
     */
    onChange: (event: SelectChangeEvent<any>, child?: ReactNode) => void;
};

export type CCControlledDatePickerProps = CCBaseControlledInputProps & CCDatePickerProps & {

    open: boolean;
    onOpen: () => void;
    onClose: () => void;

    value: Date | string | null;

    onChange: (newDate: Date | Moment | null | unknown) => void;
};

export type CCControlledDateTimePickerProps = CCBaseControlledInputProps & CCDateTimePickerProps & {

    open: boolean;
    onOpen: () => void;
    onClose: () => void;

    value: Date | string | null;

    onChange: (newDate: Date | Moment | null | unknown) => void;
};
