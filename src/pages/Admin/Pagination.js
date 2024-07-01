import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';

export default function TablePaginationDemo({count,getUsers,role}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        if(role==="student")
             getUsers(rowsPerPage,newPage*rowsPerPage,'ROLE_ETUDIANT')
        else if(role==="teacher")
            getUsers(rowsPerPage,newPage*rowsPerPage,'ROLE_ENSEIGNANT')
        else
            getUsers(rowsPerPage,newPage*rowsPerPage,'ROLE_ADMIN')
    };

    const handleChangeRowsPerPage = (event) => {
        const nbrDataPerLine=parseInt(event.target.value, 10)
        if(nbrDataPerLine<=count)
        {
            if(role==="student")
                getUsers(nbrDataPerLine,0,'ROLE_ETUDIANT')
            else if(role==="teacher")
                getUsers(nbrDataPerLine,0,'ROLE_ENSEIGNANT')
            else
                getUsers(nbrDataPerLine,0,'ROLE_ADMIN')
        }
        setRowsPerPage(nbrDataPerLine);
        setPage(0);
    };

    return (
        <TablePagination
            labelRowsPerPage="Lignes par page :"
            component="div"
            count={count}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
}
