import {EnumLabels} from '../constants/enum-labels';

export type FormInputProps = {
    name: string;
    control: any;
    label?: string;
    helperText?: string;
    variant?: 'standard' | 'filled' | 'outlined' | undefined;
    disabled?: boolean;

    /**
     * Sima input esetén
     */
    type?: 'number' | 'file' | 'password' | string;
    textarea?: boolean;
    endAdornment?: JSX.Element;
    startAdornment?: JSX.Element;

    /**
     * Radio button esetén
     */
    row?: boolean;

    /**
     * Radio, MultiCheckbox, Dropdown, Autocomplete esetén
     */
    options?: EnumLabels | any[];
    getOptionLabel?: (option: any) => string

    /**
     * Maskolt text input esetén
     */
    mask?: string;

    /**
     * Date esetén
     */
    isBirthDatePicker?: boolean;

    /**
     * Checkboxos autocompletenél több input lehetőség
     */
    multiple?: boolean;
}
