import clsx from "clsx";
import {
  ComponentProps,
  Ref,
  forwardRef,
} from "react";

import FieldWrapper, { Props as FieldWrapperProps } from "./FieldWrapper";
import {
  textFieldInput,
  textFieldInputSm,
  textFieldInputLg,
  textFieldInputError,
  errorMessage,
} from "./TextFieldInput.module.css";

interface Props extends FieldWrapperProps, ComponentProps<"textarea"> {
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
      size = "md",
      placeholder,
      wrapperClassName,
      label,
      className,
      error,
      ...inputProps
    }: Props,
    ref: Ref<HTMLTextAreaElement>
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
        <textarea
          {...inputProps}
          ref={ref}
          placeholder={placeholder}
          className={classNames}
        />

        {error && <small className={errorMessage}>{error}</small>}
      </FieldWrapper>
    );
  }
);

export default FieldInput;
