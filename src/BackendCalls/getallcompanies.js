import { API } from "../backendApi"

export const getallcompanies = () => {
    return fetch(`${API}/getAllCompanies`,{
        method: "GET"
    })
        .then(response=> {
            return response.json()
        })
        .catch(error => console.log(error))
}