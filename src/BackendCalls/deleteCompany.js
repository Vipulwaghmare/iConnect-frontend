import { API } from "../backendApi"

export const deleteCompany =(id) => {
    return fetch(`${API}/deleteCompany/${id}`,{
        method: "DELETE"
    }).then(res=>{
        return res.json()
    }).catch(error=> console.log(error))
}