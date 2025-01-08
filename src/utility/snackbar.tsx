import { OptionsObject, useSnackbar } from "notistack";

export const showNotification = (
  message: string,
  type: "success" | "error" | "info" | "warning" = "info",
  options: OptionsObject = {}
) => {
  const { enqueueSnackbar } = useSnackbar();
  enqueueSnackbar(message, {
    variant: type,
    ...options,
  });
};
