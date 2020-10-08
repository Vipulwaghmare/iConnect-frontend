import { BACK, NEXT,SET_TOTAL_PAGES, CHANGE_PAGE } from "./action"


const initState = {
    pageNo: 1, // current page no
    totalPages: 1 // Total no of pages
}

export const rootReducer = ( state= initState, action )=>{
    if(action.type === SET_TOTAL_PAGES){
        return{
            ...state,
            totalPages: action.payload.count
        }
    }
    
    if(action.type === BACK){
        if(state.pageNo === 1){
            return state
        } else {
            return {
                ...state,
                pageNo: state.pageNo -1
            }
        }
    }

    if(action.type === NEXT){
        if(state.pageNo === state.totalPages){
            return state
        } else {
            return {
                ...state,
                pageNo: state.pageNo + 1
            }
        }
    }

    if(action.type === CHANGE_PAGE){
        if(action.payload.pageNo <= state.totalPages && action.payload.pageNo > 0){
            return {
                ...state,
                pageNo: action.payload.pageNo
            }
        } else {
            return{
                ...state,
                pageNo: 1
            }
        }
    }
    
    return state
}