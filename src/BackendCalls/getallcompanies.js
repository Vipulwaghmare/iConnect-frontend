import { API } from "../backendApi"

export const getallcompanies = () => {
    return fetch(`${API}/getAllCompanies`,{
        method: "GET"
    })
        .then(response=> {
            return response.json()
        })
        .catch(error => {
            return  {error : "Unable to connect to server"}
        })
}

export const getallasccompanies = () => {
    return fetch(`${API}/getAllAscCompanies`,{
        method: "GET"
    })
        .then(response=> {
            return response.json()
        })
        .catch(error => {
            return  {error : "Unable to connect to server"}
        })
}

export const getalldsccompanies = () => {
    return fetch(`${API}/getAllDscCompanies`,{
        method: "GET"
    })
        .then(response=> {
            return response.json()
        })
        .catch(error => {
            return  {error : "Unable to connect to server"}
        })
}