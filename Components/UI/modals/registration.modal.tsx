"use client";

import RegistrationForm from "@/Components/forms/registration.form";
import CustomModal from "@/Components/common/modal";
import { OverlayState } from "@/Components/common/types";

const RegistrationModal = ({ state }: { state: OverlayState }) => {
  return (
    <CustomModal state={state} title="Create account">
      <RegistrationForm onClose={state.close} />
    </CustomModal>
  );
};

export default RegistrationModal;
