import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {getFilteredWorklog} from "./store/hospital-reducer";
import {useParams} from "react-router-dom";
import To from "./To";
import {LinearProgress, TableContainer} from "@material-ui/core";
import {TableBody} from "@material-ui/core";
import {TableCell} from "@material-ui/core";



const WorkLog = () => {
    const {id} = useParams<{ id: string }>()
    const filteredWorkLog = useSelector((state: AppRootStateType) => getFilteredWorklog(state, +id))

    return (
        <div>
            {filteredWorkLog.map((w) => {
                return (
                    <div key={w.id}>
                        <TableContainer>
                            <TableBody>
                                <TableCell>
                                    <span>{"   From " + w.from}</span>
                                </TableCell>
                                <TableCell><To employeeId={id} to={w.to}/></TableCell>
                            </TableBody>
                        </TableContainer>
                    </div>
                )
            })}
        </div>
    )
}


export default WorkLog