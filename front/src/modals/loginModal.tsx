import { Modal } from "@mantine/core";
import React from "react";

const loginModal = () => {
  return (
    <Modal title="Login" opened={true} onClose={function (): void {
          throw new Error("Function not implemented.");
      } }>
      <div>Modal content</div>
    </Modal>
  );
};

export default loginModal;
