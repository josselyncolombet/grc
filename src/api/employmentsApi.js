export const getEmployments = async () => {
    const url = process.env.REACT_APP_BASE_URL+'employments'
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

export const addEmployment = async (employment) => {
     const url = process.env.REACT_APP_BASE_URL+'employments'
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employment)
        })
        return await response.json()
        
    } catch(err){
        return console.error(err)
    }
}

// Fonction pour modifier un étudiant manuellement
export async function updateEmployment(token, employment) {

    const url = process.env.REACT_APP_BASE_URL+'employments/'
    
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                employment: employment
            })
        })
        return await response.json()
    }
    catch (error) {
        return console.error(error)
    }

}

// Fonction pour supprimer un étudiant manuellement
export async function deleteEmployment(token, id_employment) {

    const url = process.env.REACT_APP_BASE_URL+'employments/'
    
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                id_employment: id_employment
            })
        })
        return await response.json()
    }
    catch (error) {
        return console.error(error)
    }

}