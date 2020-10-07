const { ADD_MAIN_LIST, SORT_ASC, SORT_DSC } = require("./action")

const initState = {
    companies: [],
    companiesCount: 0
}

export const rootReducer = ( state= initState, action )=>{
    if(action.type === ADD_MAIN_LIST){
        return{
            ...state,
            companies: action.payload.companies,
            companiesCount: action.payload.companies.length
        }
    }
}