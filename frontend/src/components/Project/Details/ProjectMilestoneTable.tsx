'use client';
import React, {  useState, SyntheticEvent } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


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
        <Box sx={{ width: '100%' }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <TableCell align='left'>Name</TableCell>
                        <TableCell align='left'>Status</TableCell>
                        <TableCell align='left'>Start Date</TableCell>
                        <TableCell align='left'>End Date</TableCell>
                        <TableCell align='left'>Cost</TableCell>
                        <TableCell align='left'>Progress</TableCell>
                        <TableCell align='left'>Action</TableCell>
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
        </Box>
    );
}
