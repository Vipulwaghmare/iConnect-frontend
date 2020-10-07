import { API } from "../backendApi"

export const getCompanyByName = (name) => {
    return fetch(`${API}/getCompanyByName`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name: name})
    })
        .then(response=> {
            return response.json()
        })
        .catch(error => console.log(error))
}