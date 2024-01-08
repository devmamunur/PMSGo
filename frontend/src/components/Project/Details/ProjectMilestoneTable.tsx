'use client';
import React, { useState, SyntheticEvent } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import { AddBox } from '@mui/icons-material';
import CardHeader from '@mui/material/CardHeader';

export default function ProjectMilestoneTable() {
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  }; //needed

  const handleChangeRowsPerPage = (event: SyntheticEvent) => {
    setRowsPerPage(parseInt((event.target as HTMLInputElement).value));
    setPage(0);
  };

  return (
    <>
      <Card elevation={2}>
        <CardHeader
          className="flex justify-between items-center border-b"
          title="Milestones (5)"
          titleTypographyProps={{ style: { fontSize: '16px' } }}
          action={
            <IconButton aria-label="settings">
              <AddBox />
            </IconButton>
          }
        />
        <CardContent>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Start Date</TableCell>
                <TableCell align="left">End Date</TableCell>
                <TableCell align="left">Cost</TableCell>
                <TableCell align="left">Progress</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left">Mamun</TableCell>
                <TableCell align="left">Mamun</TableCell>
                <TableCell align="left">Mamun</TableCell>
                <TableCell align="left">Mamun</TableCell>
                <TableCell align="left">mamun@gmail.com</TableCell>
                <TableCell align="left">myphoto</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Mamun</TableCell>
                <TableCell align="left">Mamun</TableCell>
                <TableCell align="left">Mamun</TableCell>
                <TableCell align="left">Mamun</TableCell>
                <TableCell align="left">mamun@gmail.com</TableCell>
                <TableCell align="left">myphoto</TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={Number(12)}
            rowsPerPage={1}
            page={1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardContent>
      </Card>
    </>
  );
}
