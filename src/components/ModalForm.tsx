import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Input } from "./Form";
import { FormContainer } from "react-hook-form-mui";
import { Stack } from "@mui/material";
import { hexToRgba } from "../utils/helpers";
import { useMutation } from "@tanstack/react-query";
import { createUser, updateUser } from "../services/userService";
import { useSnackbar } from "notistack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.default",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

interface FormField {
  label: string;
  name: string;
  type?: string;
  halfWidth?: boolean;
}

interface ModalFormProps {
  id?: string;
  data?: any;
  title: string;
  fields: FormField[];
  submitButtonText: string;
  open: boolean;
  setOpen: any;
  titleIcon?: React.ReactNode; // Icon in title
  titleColor?: string; // Color in title
  successButtonIcon?: React.ReactNode; // Icon in success button
  refetch?: any;
}

export default function ModalForm({
  id,
  data,
  title,
  fields,
  submitButtonText,
  open,
  setOpen,
  titleIcon,
  titleColor = "primary.main", // Default color
  successButtonIcon,
  refetch,
}: ModalFormProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState(Boolean);

  const mutation = useMutation({
    mutationFn: id ? updateUser : createUser,
    onSuccess: (res: any) => {
      console.log("success", res);
      // variant could be success, error, warning, info, or default
      enqueueSnackbar(res.message, { variant: id ? "info" : "success" });
      refetch.invalidateQueries({ queryKey: ["users"] });
      handleClose();
    },
    onError: (error: any) => {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
    },
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate({ data });
  };

  const onUpdate = (data: any) => {
    mutation.mutate({
      data,
      id,
    });
  };

  const handleClose = () => {
    setOpen();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            {titleIcon && (
              <Box
                sx={{
                  borderRadius: "50%",
                  width: 34,
                  height: 34,
                  marginRight: 1,
                  display: "flex",
                  backgroundColor: hexToRgba(titleColor, 0.2), // Background color set to success
                  color: titleColor,
                  justifyContent: "center",
                  alignItems: "center",
                  border: `1px solid ${hexToRgba(titleColor, 0.5)}`, // Outline color
                }}>
                {titleIcon}
              </Box>
            )}
            {title}
          </Typography>
          <FormContainer
            defaultValues={{
              fullname: data?.fullname || "",
              birthday: data?.birthday || "",
              email: data?.email || "",
              password: "",
              phone: data?.phone || "",
              photo: data?.photo || "",
            }}
            onSuccess={id ? onUpdate : onSubmit}>
            <Stack
              spacing={{ xs: 1, sm: 2 }}
              direction="row"
              useFlexGap
              sx={{ flexWrap: "wrap" }}>
              {/* Full width and half width fields */}
              {fields.map((field) => (
                <Input
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  type={field.type || "text"}
                  sx={{ width: field.halfWidth ? "calc(50% - 8px)" : "100%" }}
                  required
                  fullWidth
                  InputLabelProps={
                    field.type === "date" ? { shrink: true } : undefined
                  }
                />
              ))}
            </Stack>
            <Button
              variant="contained"
              color={id ? "info" : "success"}
              sx={{
                textTransform: "capitalize",
                borderRadius: 2,
                mt: 2,
                display: "flex",
                alignItems: "center",
              }}>
              {successButtonIcon && (
                <Box sx={{ mr: 1 }}>{successButtonIcon}</Box>
              )}
              <Typography variant="caption" component="button">
                {submitButtonText}
              </Typography>
            </Button>
          </FormContainer>
        </Box>
      </Modal>
    </div>
  );
}
