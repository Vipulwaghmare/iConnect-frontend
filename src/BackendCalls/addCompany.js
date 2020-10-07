import { API } from "../backendApi"

export const addCompany = (company, name, email) => {
    return fetch(`${API}/addCompany`,{
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body: company,
    }).then(res=>{
        return res.json()
    }).then(res=> {
        console.log(res)
        return res
    }).catch(err=> {
        return {error : "Unable to connect to server"}
    })
}