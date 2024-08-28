import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import moment from "moment";
import { Avatar, Stack, useTheme } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { deleteUsers } from "../services/userService";
import AlertDialog from "./AlertDialog";
import { BorderColorRounded } from "@mui/icons-material";
import ModalForm from "./ModalForm";

export interface Data {
  id: string;
  fullname: string;
  photo: string;
  email: string;
  phone: string;
  birthday: string;
  createdAt: Date;
  updatedAt: Date;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: "asc" | "desc",
  orderBy: Key
): (
  a: { [key in Key]: number | string | Date },
  b: { [key in Key]: number | string | Date }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  id: keyof Data;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
}

const headCells: HeadCell[] = [
  {
    id: "fullname",
    numeric: false,
    disablePadding: true,
    label: "Detail",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Contact",
  },
  {
    id: "birthday",
    numeric: false,
    disablePadding: false,
    label: "Birthday",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Date",
  },
];

interface EnhancedTableHeadProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: "asc" | "desc";
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all users",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  selected: string[];
  refetch: any;
  setSelected: any;
  rows?: Data[];
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const theme = useTheme();
  const { numSelected, selected, setSelected, refetch, rows } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState(Boolean);
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

interface EnhancedTableProps {
  rows: Data[];
  refetch?: any;
}

export default function EnhancedTable({ rows, refetch }: EnhancedTableProps) {
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("fullname");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      rows
        .slice()
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [rows, order, orderBy, page, rowsPerPage]
  );
  return (
    <Paper sx={{ width: "100%", mb: 2, borderRadius: 5 }}>
      <EnhancedTableToolbar
        refetch={refetch}
        selected={selected}
        numSelected={selected.length}
        setSelected={setSelected}
        rows={rows}
      />
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={"medium"}>
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {visibleRows.map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                  sx={{ cursor: "pointer" }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none">
                    <Stack direction="row" spacing={2}>
                      <Avatar
                        alt={row.fullname}
                        src={row.photo || "/static/images/avatar/1.jpg"}
                      />
                      <Typography
                        variant="caption"
                        sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="caption" fontWeight={500}>
                          {row.fullname}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.6 }}>
                          Updated: {moment(row.updatedAt).fromNow()}
                        </Typography>
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      variant="caption"
                      sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="caption" fontWeight={500}>
                        {row.email || ""}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.6 }}>
                        {row.phone || ""}
                      </Typography>
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="caption" fontWeight={500}>
                      {row.birthday &&
                        moment(row.birthday).format("MMMM D, YYYY")}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      variant="caption"
                      sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="caption" fontWeight={500}>
                        {moment(row.createdAt).format("MMMM D, YYYY")}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.6 }}>
                        {moment(row.createdAt).format("h:mm A")}
                      </Typography>
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
