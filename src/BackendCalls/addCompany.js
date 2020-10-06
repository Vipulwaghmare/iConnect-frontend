import { API } from "../backendApi"

export const addCompany = company => {
    fetch(`${API}/addCompany`,{
        method: "POST",
        headers: {

        },
        body: company
    })
}