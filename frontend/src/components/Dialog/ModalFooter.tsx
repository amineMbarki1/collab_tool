import { ComponentProps } from "react";
import { CardFooter } from "../Card";

export default function ModalFooter({
  className,
  children,
}: ComponentProps<typeof CardFooter>) {
  return <CardFooter className={className}>{children}</CardFooter>;
}
