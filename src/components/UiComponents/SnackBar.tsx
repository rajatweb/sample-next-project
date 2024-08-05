'use client'

import React from "react";
import { Snackbar } from "@mui/material";
import { useAppSelector, useActions } from "@/lib/hooks";
import AlertError from "./Alerts/AlertErrors";
import AlertInfo from "./Alerts/AlertInfo";
import AlertSuccess from "./Alerts/AlertSuccess";
import DismissButton from "./Button/DismissButton";

const UiSnackbar = () => {
  const snackbarState = useAppSelector((state) => state.snackbar);
  const { toggleCloseSnackbar } = useActions();

  const alterMap = {
    error: AlertError,
    success: AlertSuccess,
    info: AlertInfo,
  };

  const AlertComponent = alterMap[snackbarState.status!];

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    toggleCloseSnackbar();
  };

  return (
    <Snackbar
      open={snackbarState.isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <AlertComponent
        onClose={handleClose}
        elevation={20}
        message={snackbarState.message!}
        action={<DismissButton onClick={handleClose} />}
      />
    </Snackbar>
  );
};

export default UiSnackbar;