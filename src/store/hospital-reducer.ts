import {Dispatch} from "redux";
import {getEmployees, getWorklog} from "../api";
import {AppRootStateType} from "./store";


type ActionsType = SetEmployeesActionType | SetWorkLogType | SetLoadingType | FilterWorkLogType

export type EmployeeType = {
    id: number
    firstName: string
    lastName: string
    middleName: string
    birthDate: string
    phone: string
}
export type WorkLogType = {
    id: number
    employee_id: number
    from: string
    to: string
}

type InitialStateType = {
    loading: boolean
    employees: Array<EmployeeType>,
    worklog: Array<WorkLogType>
}

const initialState = {
    loading: false,
    employees: [],
    worklog: []
}


export const hospitalReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET-EMPLOYEES":
            return {
                ...state, employees: action.employees
            }
        case "SET-WORKLOG":
            return {
                ...state, worklog: action.worklog
            }
        case "SET-LOADING":
            return {
                ...state, loading: action.loading
            }
        default:
            return state
    }
}
//selectors
export const getFilteredWorklog = (state: AppRootStateType, id: number): Array<WorkLogType> => state.hospital.worklog.filter(w => w.employee_id === id)
export const getSortedEmployees = (state: AppRootStateType): Array<EmployeeType> => state.hospital.employees.sort(((a, b) => a.lastName > b.lastName ? 1 : -1))


//AC
const setEmployees = (employees: Array<EmployeeType>) => ({type: 'SET-EMPLOYEES', employees} as const)
const setWorkLog = (worklog: Array<WorkLogType>) => ({type: 'SET-WORKLOG', worklog} as const)
const setLoading = (loading: boolean) => ({type: 'SET-LOADING', loading} as const)
export const filterWorkLog = (id: number) => ({type: 'FILTER-WORKLOG', id} as const)

type SetEmployeesActionType = ReturnType<typeof setEmployees>
type SetWorkLogType = ReturnType<typeof setWorkLog>
type SetLoadingType = ReturnType<typeof setLoading>
type FilterWorkLogType = ReturnType<typeof filterWorkLog>

//TC
export const setSortedEmployeesTC = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(setLoading(true));
            const res = await getEmployees()
            dispatch(setEmployees(res))
            dispatch(setLoading(false))
        } catch (err) {
            console.log('sss')
        }
    }
}
export const setWorkLogTC = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(setLoading(true));
            const res = await getWorklog()
            dispatch(setWorkLog(res))
            dispatch(setLoading(false))
        } catch (err) {
            console.log('sss')
        } finally {
            dispatch(setLoading(false))
        }
    }
}