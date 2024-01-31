import {
  ComponentProps,
  PropsWithChildren,
  ReactElement,
  forwardRef,
} from "react";
import clsx from "clsx";

import Loader from "../Loader/Loader";

import styles from "./Button.module.css";

interface Props extends ComponentProps<"button"> {
  variant?: "outline" | "filled" | "ghost";
  color?: "primary" | "secondary" | "accent";
  size?: "lg" | "sm";
  fullWidth?: boolean;
  iconLeft?: ReactElement;
  iconRight?: ReactElement;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  (
    {
      children,
      variant = "filled",
      color = "primary",
      size,
      fullWidth = false,
      className,
      iconLeft,
      iconRight,
      isLoading,
      ...props
    },
    ref
  ) => {
    const composedClassName = clsx({
      [styles.button]: true,
      [styles.buttonPrimary]: variant === "filled" && color === "primary",
      [styles.buttonOutlinePrimary]:
        variant === "outline" && color === "primary",
      [styles.buttonAccent]: color === "accent" && variant === "filled",
      [styles.buttonLarge]: size === "lg",
      [styles.buttonSmall]: size === "sm",
      [styles.fullWidth]: fullWidth,
      [className!]: !!className,
      [styles.buttonGhost]: variant === "ghost",
      [styles.buttonGhostSecondary]:
        variant === "ghost" && color === "secondary",
    });

    return (
      <button
        ref={ref}
        disabled={isLoading}
        className={composedClassName}
        {...props}
      >
        {isLoading && (
          <Loader className={clsx({ [styles.smallLoader]: size === "sm" })} />
        )}
        {iconLeft}
        {children}
        {iconRight}
      </button>
    );
  }
);

export default Button;
