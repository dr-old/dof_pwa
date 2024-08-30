import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import { Avatar, Card, Stack, useTheme } from "@mui/material";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";

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

interface EnhancedTableProps {
  rows: Data[];
  refetch?: any;
}

export default function EnhancedTable({ rows, refetch }: EnhancedTableProps) {
  const theme = useTheme();
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
    <Card sx={{ borderRadius: theme.shape.borderRadius * 1.5 }}>
      <Box sx={{ overflowX: "auto" }}>
        <EnhancedTableToolbar
          refetch={refetch}
          selected={selected}
          numSelected={selected.length}
          setSelected={setSelected}
          rows={rows}
        />
        <TableContainer>
          <Table
            // sx={{ minWidth: "800px" }}
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
      </Box>
    </Card>
  );
}
