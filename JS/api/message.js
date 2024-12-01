const API_URL = "https://s3-4683.nuage-peda.fr/Forum2/public/api/messages"

async function getMessages() { 
    try {
        const response = await fetch(`${API_URL}`)
        console.log(response);
        if (!response.ok) {
            throw new Error('Erreur : ' + response.statusText)
        }
        const data = await response.json(); 
        return data["hydra:member"]
    } catch (error) {
        console.log("erreur lors de la reception : ", error);
    }
}


export{getMessages}