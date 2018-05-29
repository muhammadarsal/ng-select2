export interface Select2OptionData {
    id: string;
    text: string;
    disabled?: boolean;
    children?: Array<Select2OptionData>;
    additional?: any;
}
