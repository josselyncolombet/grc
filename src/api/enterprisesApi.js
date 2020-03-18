export const getEnterprises = async () => {
    const url = process.env.REACT_APP_BASE_URL+'enterprises'
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

export const addEnterprise = async (enterprise) => {
     const url = process.env.REACT_APP_BASE_URL+'enterprises'
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(enterprise)
        })
        return await response.json()
        
    } catch(err){
        return console.error(err)
    }
}

// Fonction pour modifier un étudiant manuellement
export async function updateEnterprise(token, enterprise) {

    const url = process.env.REACT_APP_BASE_URL+'enterprises/'
    
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                enterprise: enterprise
            })
        })
        return await response.json()
    }
    catch (error) {
        return console.error(error)
    }

}

// Fonction pour supprimer un étudiant manuellement
export async function deleteEnterprise(token, id_enterprise) {

    const url = process.env.REACT_APP_BASE_URL+'enterprises/'
    
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                id_enterprise: id_enterprise
            })
        })
        return await response.json()
    }
    catch (error) {
        return console.error(error)
    }

}