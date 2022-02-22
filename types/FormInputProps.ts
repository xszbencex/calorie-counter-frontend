import {EnumLabels} from '../constants/enum-labels';
import {Control} from 'react-hook-form';
import {AutocompleteProps, CheckboxProps, FormControlLabelProps, FormControlProps, SelectProps, TextFieldProps} from '@mui/material';
import {Props} from 'react-input-mask';
import {DatePickerProps, DateTimePickerProps} from '@mui/lab';

type CCBaseInputProps = {
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

export type CCTextInputProps = CCBaseInputProps & {
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

export type CCSelectProps = CCBaseInputProps & {
    /**
     * Az opciók tömbje
     */
    options: EnumLabels | any[];

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

export type CCAutocompleteProps = CCBaseInputProps & {
    /**
     * Az opciók tömbje
     */
    options: EnumLabels | any[];

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

export type CCMaskedTextInputProps = CCBaseInputProps & {
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

export type CCDatePickerProps = CCBaseInputProps & {
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
    datePickerProps?: Omit<DatePickerProps, 'label' | 'onChange'>

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

export type CCDateTimePickerProps = CCBaseInputProps & {
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
    dateTimePickerProps?: Omit<DateTimePickerProps, 'label' | 'onChange' | 'value'>

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

export type CCRadioButtonProps = CCBaseInputProps & {
    /**
     * Az opciók tömbje
     */
    options: EnumLabels | any[];

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

export type CCCheckboxProps = CCBaseInputProps & {
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
