export const getStudents = async () => {
    const url = process.env.REACT_APP_BASE_URL + 'students'
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return await response.json()

    } catch (err) {
        return console.error(err)
    }
}

export const addStudent = async (student) => {
    const url = process.env.REACT_APP_BASE_URL + 'students'
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        })
        return await response.json()

    } catch (err) {
        return console.error(err)
    }
}

export async function updateStudent(student) {

    const url = process.env.REACT_APP_BASE_URL + 'students/' + student._id

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(student)
        })
        return await response.json()
    }
    catch (error) {
        return console.error(error)
    }

}

export async function deleteStudent(id) {

    const url = process.env.REACT_APP_BASE_URL + 'students/' + id

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        return await response.json()
    }
    catch (error) {
        return console.error(error)
    }

}