import clsx from "clsx";
import { InputHTMLAttributes, Ref, forwardRef } from "react";

import FieldWrapper, { Props as FieldWrapperProps } from "./FieldWrapper";
import {
  textFieldInput,
  textFieldInputSm,
  textFieldInputLg,
  textFieldInputError,
  errorMessage,
} from "./TextFieldInput.module.css";

interface Props
  extends FieldWrapperProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  type?: "email" | "password" | "text" | "textarea";
  name?: string;
  size?: "sm" | "lg" | "md";
  className?: string;
  wrapperClassName?: string;
  placeholder?: string;
  error?: string | boolean;
}

const FieldInput = forwardRef(
  (
    {
      type = "text",
      size = "md",
      placeholder,
      wrapperClassName,
      label,
      className,
      error,
      ...inputProps
    }: Props,
    ref: Ref<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const classNames = clsx({
      [textFieldInputSm]: size === "sm",
      [textFieldInputLg]: size === "lg",
      [textFieldInputError]: !!error,
      [textFieldInput]: true,
      [className!]: !!className,
    });
    return (
      <FieldWrapper className={wrapperClassName} label={label}>
        {type === "textarea" ? (
          <textarea
            ref={ref as Ref<HTMLTextAreaElement>}
            placeholder={placeholder}
            className={classNames}
          />
        ) : (
          <input
            {...inputProps}
            ref={ref as Ref<HTMLInputElement>}
            placeholder={placeholder}
            className={classNames}
            type={type}
          />
        )}

        {error && <small className={errorMessage}>{error}</small>}
      </FieldWrapper>
    );
  }
);

export default FieldInput;
