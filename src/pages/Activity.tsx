import { useQuery, useQueryClient } from "@tanstack/react-query";
import EnhancedTable, { Data } from "../components/EnhancedTable";
import { getUsers } from "../services/userService";
import ModalForm from "../components/ModalForm";
import ActivityIndicator from "../components/ActivityIndicator";
import { CreateRounded } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { useAuth } from "../context/useAuth";

const Activity = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<any | undefined, Error>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  function createData(
    id: string,
    name: string,
    photo: string,
    email: string,
    phone: string,
    birthday: string,
    createdAt: Date,
    updatedAt: Date
  ): Data {
    return { id, name, photo, email, phone, birthday, createdAt, updatedAt };
  }
  const client = useQueryClient();
  if (isLoading) return <ActivityIndicator fullScreen={true} />;

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
      <ModalForm
        title="Create User"
        titleIcon={<CreateRounded fontSize="small" />}
        titleColor={theme.palette.success.main}
        fields={userFields}
        submitButtonText="Create User"
        refetch={client}
        openButtonText="New User"
      />
      <EnhancedTable rows={rows} refetch={client} />
    </>
  );
};

export default Activity;
