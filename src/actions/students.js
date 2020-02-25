import * as fromStudentsAPI from '../api/students'

export const GET_STUDENTS = "GET_STUDENTS"

export const allStudents = students => ({
    type: GET_STUDENTS,
    students
})

export const getStudents = () => async dispatch => {
     const students = await fromStudentsAPI.getStudents()
     dispatch(allStudents(students))
}

/*export const addStudent = (token, year, classroom, student, date_soutenance) => async dispatch => {
    dispatch(addStudentPending())
    const { Student } = await fromApiStudent.addStudent(token, year, classroom, student, date_soutenance)
    dispatch(addStudentFulFilled(Student))

    const { Students } = await fromApiStudent.getStudents(token)
    dispatch(fromActionsAuth.listStudents(Students))
}

export const updateStudent = (token, update_student) => async dispatch => {
    dispatch(updateStudentPending())
    // eslint-disable-next-line
    
    const { Student } = await fromApiStudent.updateStudent(token, update_student)
    dispatch(updateStudentFulFilled(Student))

    const { Students } = await fromApiStudent.getStudents(token)
    dispatch(fromActionsAuth.listStudents(Students))
    let update = true
    return update
}

export const deleteStudent = (token, id_student) => async dispatch => {
    dispatch(deleteStudentPending())
    const { Student } = await fromApiStudent.deleteStudent(token, id_student)
    dispatch(deleteStudentFulFilled(Student))

    const { Students } = await fromApiStudent.getStudents(token)
    dispatch(fromActionsAuth.listStudents(Students))
}*/