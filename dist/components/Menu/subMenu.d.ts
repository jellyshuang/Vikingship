import React, { ReactNode } from "react";
export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
    children?: ReactNode;
}
declare const SubMenu: React.FC<SubMenuProps>;
export default SubMenu;
