export const getStudents = async () => {
    const url = process.env.REACT_APP_BASE_URL+'students'
    try{
        const response = await fetch(url, {
            method: 'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json'
            }
        })
        return await response.json()
        
    } catch(err){
        return console.error(err)
    }
}

export const addStudent = async (student) => {
     const url = process.env.REACT_APP_BASE_URL+'students'
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        })
        return await response.json()
        
    } catch(err){
        return console.error(err)
    }
}

// Fonction pour modifier un étudiant manuellement
export async function updateStudent(token, student) {

    const url = process.env.REACT_APP_BASE_URL+'students/'
    
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                student: student
            })
        })
        return await response.json()
    }
    catch (error) {
        return console.error(error)
    }

}

// Fonction pour supprimer un étudiant manuellement
export async function deleteStudent(token, id_student) {

    const url = process.env.REACT_APP_BASE_URL+'students/'
    
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                id_student: id_student
            })
        })
        return await response.json()
    }
    catch (error) {
        return console.error(error)
    }

}