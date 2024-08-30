import * as React from "react";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useTheme } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { deleteUsers } from "../services/userService";
import AlertDialog from "./AlertDialog";
import { BorderColorRounded } from "@mui/icons-material";
import ModalForm from "./ModalForm";
import ActivityIndicator from "./ActivityIndicator";
import { Data } from "./EnhancedTable";

interface EnhancedTableToolbarProps {
  numSelected: number;
  selected: string[];
  refetch: any;
  setSelected: any;
  rows?: Data[];
}

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const theme = useTheme();
  const { numSelected, selected, setSelected, refetch, rows } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setLoading] = React.useState(Boolean);
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelected([]);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const mutation = useMutation({
    mutationFn: deleteUsers,
    onSuccess: (data) => {
      console.log("success", data);
      // variant could be success, error, warning, info, or default
      enqueueSnackbar("Successfully deleted users selected", {
        variant: "success",
      });
      refetch.invalidateQueries({ queryKey: ["users"] });
      setSelected([]);
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

  const onSubmit = () => {
    mutation.mutate(selected);
  };

  const dataUser = React.useMemo(() => {
    return rows?.find((i) => i.id === selected[0]);
  }, [selected, rows]);

  const userFields = [
    { label: "Full Name", name: "fullname", halfWidth: false },
    { label: "Birthday", name: "birthday", type: "date", halfWidth: false },
    { label: "Email", name: "email", type: "email", halfWidth: true },
    { label: "Password", name: "password", type: "password", halfWidth: true },
    { label: "Phone", name: "phone", halfWidth: true },
    { label: "Photo URL", name: "photo", halfWidth: true },
  ];

  if (isLoading) return <ActivityIndicator fullScreen={true} />;

  return (
    <>
      <Toolbar
        sx={[
          {
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          },
          numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          },
        ]}>
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <>
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div">
              User Information
            </Typography>
          </>
        )}

        {numSelected > 0 ? (
          <>
            {numSelected === 1 && (
              <Tooltip title="Edit">
                <IconButton onClick={handleOpenModal}>
                  <BorderColorRounded />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Delete">
              <IconButton onClick={handleOpen}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      {open && (
        <AlertDialog
          open={open}
          onClose={handleClose}
          title="Confirm Delete"
          content={`Are you sure you want to delete the selected user? This action cannot be undone.`}
          onConfirm={onSubmit} // Replace onSubmit with your delete handler function
          confirmText="Delete"
          cancelText="Cancel"
        />
      )}
      {openModal && (
        <ModalForm
          title="Update User"
          titleIcon={<BorderColorRounded fontSize="small" />}
          titleColor={theme.palette.info.main}
          fields={userFields}
          submitButtonText="Update User"
          refetch={refetch}
          open={openModal}
          setOpen={handleCloseModal}
          data={dataUser}
          id={selected[0]}
        />
      )}
    </>
  );
}
