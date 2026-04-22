"use client";

import LoginForm from "@/Components/forms/login.form";
import CustomModal from "@/Components/common/modal";
import { OverlayState } from "@/Components/common/types";

const LoginModal = ({ state }: { state: OverlayState }) => {
  return (
    <CustomModal state={state} title="Login">
      <LoginForm onClose={state.close} />
    </CustomModal>
  );
};

export default LoginModal;
