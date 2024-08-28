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
import { createUser } from "../services/userService";
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
  title: string;
  fields: FormField[];
  submitButtonText: string;
  openButtonText: string;
  titleIcon?: React.ReactNode; // Icon in title
  titleColor?: string; // Color in title
  successButtonIcon?: React.ReactNode; // Icon in success button
  refetch?: any;
}

export default function ModalForm({
  title,
  fields,
  submitButtonText,
  openButtonText,
  titleIcon,
  titleColor = "primary.main", // Default color
  successButtonIcon,
  refetch,
}: ModalFormProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(Boolean);

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      console.log("success", data);
      // variant could be success, error, warning, info, or default
      enqueueSnackbar(data.message, { variant: "success" });
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
    console.log("data", data);
    mutation.mutate({ data });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ textTransform: "capitalize", borderRadius: 2, mb: 2 }}>
        <Typography variant="caption" component="button">
          {openButtonText}
        </Typography>
      </Button>
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
              fullname: "",
              birthday: "",
              email: "",
              password: "",
              phone: "",
              photo: "",
            }}
            onSuccess={onSubmit}>
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
              color="success" // Apply color for success button
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
