import { Avatar } from "@/components/Avatar";
import { Modal, ModalContent, ModalProps } from "@/components/Dialog";
import { User } from "@/types";

interface Props extends ModalProps {
  user: User;
}

export default function UserProfileModal({ user, ...props }: Props) {
  return (
    <Modal {...props}>
      <ModalContent>
        <Avatar />
        {user.email}
        {user.firstName}
        {user.lastName}
      </ModalContent>
    </Modal>
  );
}
