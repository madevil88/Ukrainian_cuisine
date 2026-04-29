"use client";

import RegistrationForm from "@/forms/registration.form";
import CustomModal from "@/components/common/modal";
import { OverlayState } from "@/types/overlay-state";

const RegistrationModal = ({ state }: { state: OverlayState }) => {
  return (
    <CustomModal state={state} title="Create account">
      <RegistrationForm onClose={state.close} />
    </CustomModal>
  );
};

export default RegistrationModal;
