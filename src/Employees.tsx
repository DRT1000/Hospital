import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {getSortedEmployees} from "./store/hospital-reducer";
import {NavLink} from "react-router-dom";
import {LinearProgress, Link, Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core";


function Employees() {
    const sortedEmployees = useSelector((state: AppRootStateType) => getSortedEmployees(state))
    let loading = useSelector<AppRootStateType, boolean>(state => state.hospital.loading)


    return (
        <div>
            {loading && <LinearProgress/>}
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Date of birthday</TableCell>
                        </TableRow>
                        {sortedEmployees.map(e => <TableRow key={e.id}>
                                <TableCell>{e.id}</TableCell>
                                <TableCell>
                                    <Link>
                                        <NavLink
                                            to={`/worklog/${e.id}`}>{e.lastName + " " + e.firstName + " " + e.middleName}</NavLink>
                                    </Link>
                                </TableCell>
                                <TableCell>{e.birthDate}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Employees