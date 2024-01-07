'use client';
import React, { useEffect, useState, SyntheticEvent } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from '@/lib/styeldComponent/SearchField';
import SearchIcon from '@mui/icons-material/Search';
import TaskRequest from '@/APIRequests/task.request';
import DeleteHelper from '@/helpers/delete.helper';
import { RootState } from '@/redux/store/store';

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Title',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'createdDate',
    numeric: true,
    disablePadding: false,
    label: 'Created Date',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Action',
  },
];
interface EnhancedTableHeadProps {
  onSelectAllClick: (event: SyntheticEvent) => void;
  numSelected: number;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const { onSelectAllClick, numSelected, rowCount } = props;
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map(headCell => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
            >
              {headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};
interface EnhancedTableToolbarProps {
  numSelected: number;
  searchOnChange: (event: SyntheticEvent) => void;
  deleteSelected: () => void;
}
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, searchOnChange, deleteSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Task List
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={deleteSelected}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <div>
          <Search sx={{ width: '200px' }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={searchOnChange}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </div>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  searchOnChange: PropTypes.func.isRequired,
  deleteSelected: PropTypes.func.isRequired,
};

export default function DataTable() {
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');

  useEffect(() => {
    TaskRequest.getTaskList(page, rowsPerPage, search).then(res => {});
  }, [rowsPerPage, page, search]);

  let ALLTask = useSelector((state: RootState) => state.task.ALLTask);
  let TotalTask = useSelector((state: RootState) => state.task.Total);

  const handleSelectAllClick = (event: SyntheticEvent) => {
    if ((event.target as HTMLInputElement).checked) {
      const newSelected = ALLTask.map((n: any) => n._id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };
  const handleClick = (event: SyntheticEvent, id: string) => {
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

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: SyntheticEvent) => {
    setRowsPerPage(parseInt((event.target as HTMLInputElement).value));
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const handleSearchOnChange = (event: SyntheticEvent) => {
    setPage(0);
    setSearch((event.target as HTMLInputElement).value);
  };

  const handleDeleteSelected = () => {
    DeleteHelper.deleteSelectedTaskAlert(selected).then((res: boolean) => {
      if (res) {
        setSelected([]);
        TaskRequest.getTaskList(page, rowsPerPage, search).then(res => {});
      }
    });
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          searchOnChange={handleSearchOnChange}
          deleteSelected={handleDeleteSelected}
          numSelected={selected.length}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={parseInt(ALLTask.length)}
            />
            <TableBody>
              {ALLTask.map((row: any, index: number) => {
                const isItemSelected = isSelected(row._id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={event => handleClick(event, row._id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.title}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.title}
                    </TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                    <TableCell align="right">{row.createdDate}</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={Number(TotalTask)}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
