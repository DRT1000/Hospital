import React, {useEffect, useState} from "react";

import style from "./App.module.css"
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

type PropsType = {
    employeeId: string
    to: string
}

function To(props: PropsType) {

    const worklog = useSelector((state: AppRootStateType) => state.hospital.worklog)
    const otherWorklog = worklog.filter(w => w.employee_id !== +props.employeeId)

    let to = Date.parse(props.to)

    const otherTo = otherWorklog.map(o => Date.parse(o.to))
    const otherFrom = otherWorklog.map(o => Date.parse(o.from))

    let [getTrue, setTrue] = useState<boolean>(false)
    const border = 2

    useEffect(() => {
        let count = 0
        for (let i = 0; i < otherTo.length; i++) {
            if (otherTo[i] > to && to > otherFrom[i]) {
                count = count + 1;
            }
            if (count < border) {
                setTrue(true)
            } else if (count > border) {
                setTrue(false)
            }
        }
    }, [to, otherTo, otherFrom])

    return (
        <span className={getTrue ? style.notTrue : ""}>{" To " + props.to}</span>
    )
}


export default To
