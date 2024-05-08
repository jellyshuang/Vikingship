/// <reference types="react" />
export interface FieldDetail {
    name: string;
    value: string;
    rules: any[];
    isValid: boolean;
    errors: any[];
}
export interface FieldsState {
    [key: string]: FieldDetail;
}
export interface FormState {
    isValid: boolean;
}
export interface FieldsAction {
    type: 'addField';
    name: string;
    value: any;
}
declare function useStore(): {
    fields: FieldsState;
    dispatch: import("react").Dispatch<FieldsAction>;
    form: FormState;
};
export default useStore;
