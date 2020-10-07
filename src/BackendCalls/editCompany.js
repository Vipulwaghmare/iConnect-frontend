import { API } from "../backendApi"

export const editCompany = (company, name, email) => {
    return fetch(`${API}/addCompany`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
        },
        body: company,
        body2: name
    }).then(res=>{
        return res.json()
    }).then(res=> {
        console.log(res)
        return res
    }).catch(err=> {
        return {error : "Unable to connect to server"}
    })
}