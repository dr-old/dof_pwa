import { useQuery, useQueryClient } from "@tanstack/react-query";
import EnhancedTable, { Data } from "../components/EnhancedTable";
import { getUsers } from "../services/userService";
import ModalForm from "../components/ModalForm";
import ActivityIndicator from "../components/ActivityIndicator";
import { CreateRounded } from "@mui/icons-material";
import { Button, Typography, useTheme } from "@mui/material";
import { useAuth } from "../context/useAuth";
import { useState } from "react";

const Activity = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const client = useQueryClient();
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<any | undefined, Error>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const handleOpen = () => setOpen(true);

  function createData(
    id: string,
    fullname: string,
    photo: string,
    email: string,
    phone: string,
    birthday: string,
    createdAt: Date,
    updatedAt: Date
  ): Data {
    return {
      id,
      fullname,
      photo,
      email,
      phone,
      birthday,
      createdAt,
      updatedAt,
    };
  }

  if (isLoading || error) return <ActivityIndicator fullScreen={true} />;

  const rows: Data[] =
    users?.data?.length > 0
      ? users.data
          .filter((i: any) => i.email !== user?.email)
          .map((item: any) =>
            createData(
              item._id,
              item.fullname,
              item.photo,
              item.email,
              item.phone,
              item.birthday,
              item.createdAt,
              item.updatedAt
            )
          )
      : [];

  const userFields = [
    { label: "Full Name", name: "fullname", halfWidth: false },
    { label: "Birthday", name: "birthday", type: "date", halfWidth: false },
    { label: "Email", name: "email", type: "email", halfWidth: true },
    { label: "Password", name: "password", type: "password", halfWidth: true },
    { label: "Phone", name: "phone", halfWidth: true },
    { label: "Photo URL", name: "photo", halfWidth: true },
  ];

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={handleOpen}
        sx={{ textTransform: "capitalize", borderRadius: 2, mb: 2 }}>
        <Typography variant="caption" component="button">
          New User
        </Typography>
      </Button>
      <EnhancedTable rows={rows} refetch={client} />
      <ModalForm
        title="Create User"
        titleIcon={<CreateRounded fontSize="small" />}
        titleColor={theme.palette.success.main}
        fields={userFields}
        submitButtonText="Create User"
        refetch={client}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default Activity;
