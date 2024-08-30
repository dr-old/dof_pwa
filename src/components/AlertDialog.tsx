import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material";

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
  onConfirm?: () => void; // Optional confirm action
  confirmText?: string;
  cancelText?: string;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onClose,
  title,
  content,
  onConfirm,
  confirmText,
  cancelText,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: theme.shape.borderRadius * 1, // Customize border radius
        },
      }}>
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          fontSize: "1.25rem", // Customize title font size
          fontWeight: 600,
        }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{
            fontSize: "0.85rem", // Customize content font size
          }}>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelText}</Button>
        {onConfirm && (
          <Button onClick={onConfirm} autoFocus>
            {confirmText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
