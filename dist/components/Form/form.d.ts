import { FC, ReactNode } from "react";
export interface FormProps {
    name?: string;
    children?: ReactNode;
}
export declare const Form: FC<FormProps>;
export default Form;
