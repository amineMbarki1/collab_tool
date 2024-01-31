import { PropsWithChildren } from "react";

import { fieldWrapper, textFieldLabel } from "./FieldWrapper.module.css";

export interface Props {
  label?: string;
  className?: string;
}

export default function FieldWrapper({
  children,
  label,
  className,
}: PropsWithChildren<Props>) {
  return (
    <div className={`${fieldWrapper} ${className ? className : ""}`}>
      {label && <label className={textFieldLabel}>{label}</label>}
      {children}
    </div>  
  );
}
