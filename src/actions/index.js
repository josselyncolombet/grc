import * as fromAPI from '../api'

export const GET_STUDENTS = "GET_STUDENTS"
export const GET_STUDENTS_SAGA = "GET_STUDENTS_SAGA"
export const ADD_STUDENT_SAGA = "ADD_STUDENT"

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
