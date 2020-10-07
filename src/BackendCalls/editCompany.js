import { API } from "../backendApi"

export const editCompany = (company, id) => {
    return fetch(`${API}/editCompany/${id}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
        },
        body: company
    }).then(res=>{
        return res.json()
    }).then(res=> {
        console.log(res)
        return res
    }).catch(err=> {
        return {error : "Unable to connect to server"}
    })
}