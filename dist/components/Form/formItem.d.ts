import { FC, ReactNode } from "react";
export interface FormItemProps {
    label?: string;
    children?: ReactNode;
}
export declare const FormItem: FC<FormItemProps>;
export default FormItem;
