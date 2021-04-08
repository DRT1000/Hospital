import React, {useEffect} from "react";
import {Route} from "react-router-dom";
import Employees from "./Employees";
import WorkLog from "./WorkLog";
import {useDispatch} from "react-redux";
import {setSortedEmployeesTC, setWorkLogTC} from "./store/hospital-reducer";



function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setSortedEmployeesTC())
        dispatch(setWorkLogTC())
    }, [])



    return (

        <div>
            <Route exact path={"/"} render={() => <Employees/>}/>
            <Route path={"/worklog/:id"} render={() => <WorkLog/>}/>
        </div>
    )
}

export default App;
