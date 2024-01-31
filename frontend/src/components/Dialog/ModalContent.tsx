import { ComponentProps } from "react";
import { CardBody } from "../Card";

export default function ModalContent({
  children,
  className,
}: ComponentProps<typeof CardBody>) {
  return <CardBody className={className}>{children}</CardBody>;
}
