// Fonction pour lister tous les étudiants
export async function getStudents(token) {

    const url = 'http://localhost:8080/students/'
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return await response.json()
    }
    catch (error) {
        return console.error(error)
    }

}

// Fonction pour ajouter un étudiant manuellement
export async function addStudent(token, year, classroom, student, date_soutenance) {

    const url = process.env.REACT_APP_BASE_URL+'students/'
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                year: year,
                classroom: classroom,
                student: student,
                date_soutenance: date_soutenance
            })
        })
        return await response.json()
    }
    catch (error) {
        return console.error(error)
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