"use client";

import { Modal } from "@heroui/react";
import { OverlayState } from "@/Components/common/types";

const CustomModal = ({ children, state, title }: { children: React.ReactNode; state: OverlayState; title?: string }) => {
  return (
    <Modal state={state}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header style={{ alignItems: 'center' }}>
              <Modal.Heading
                className="text-lg font-bold text-gray-900">
                {title}
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default CustomModal;
