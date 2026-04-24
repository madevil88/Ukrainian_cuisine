"use client";

import LoginForm from "@/Components/forms/login.form";
import CustomModal from "@/Components/common/modal";
import { OverlayState } from "@/types/overlay-state";

const LoginModal = ({ state }: { state: OverlayState }) => {
  return (
    <CustomModal state={state} title="Login">
      <LoginForm onClose={state.close} />
    </CustomModal>
  );
};

export default LoginModal;
