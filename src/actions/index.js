import * as fromAPI from '../api'

export const GET_STUDENTS = "GET_STUDENTS"
export const GET_STUDENTS_SAGA = "GET_STUDENTS_SAGA"
export const ADD_STUDENT_SAGA = "ADD_STUDENT"

export const GET_ENTERPRISES = "GET_ENTERPRISES"
export const GET_ENTERPRISES_SAGA = "GET_ENTERPRISES_SAGA"
export const ADD_ENTERPRISE_SAGA = "ADD_ENTERPRISE"

export const GET_EMPLOYMENTS = "GET_EMPLOYMENTS"
export const GET_EMPLOYMENTS_SAGA = "GET_EMPLOYMENTS_SAGA"
export const ADD_EMPLOYMENT_SAGA = "ADD_EMPLOYMENT"

export const getStudentsSaga = () => ({
    type: GET_STUDENTS_SAGA
})
export const allStudents = students => ({
    type: GET_STUDENTS,
    payload: students
})
export const addStudent = student => ({
    type: ADD_STUDENT_SAGA,
    payload: student
})

export const getEnterprisesSaga = () => ({
    type: GET_ENTERPRISES_SAGA
})
export const allEnterprises = enterprises => ({
    type: GET_ENTERPRISES,
    payload: enterprises
})
export const addEnterprise = enterprise => ({
    type: ADD_ENTERPRISE_SAGA,
    payload: enterprise
})

export const getEmploymentsSaga = () => ({
    type: GET_EMPLOYMENTS_SAGA
})
export const allEmployments = employments => ({
    type: GET_EMPLOYMENTS,
    payload: employments
})
export const addEmployment = employment => ({
    type: ADD_EMPLOYMENT_SAGA,
    payload: employment
})