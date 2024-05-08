import classNames from "classnames";
import React, {FC, ReactNode} from "react";

export interface FormItemProps {
  label?: string;
  children?: ReactNode;
}

export const FormItem: FC<FormItemProps> = (props) => {
  const {
    label,
    children
  } = props;

  const rowClass = classNames('viking-row', {
    'viking-row-no-label': !label
  })

  return (
    <div className={rowClass}>
      {
        label && 
        <div className="viking-form-item-label">
          <label title={label}>
            {label}
          </label>
        </div>
      }
      <div className="viking-form-item">
        {children}
      </div>
    </div>
  )
}

export default FormItem;