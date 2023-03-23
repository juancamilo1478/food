import { GET_CARDS, SEARCH_CARDS } from "../actions/actions";


const initialState={
    cards:[],
    memorie:[]

}

const rootReducer=(state=initialState ,{type,payload})=>{
    switch (type) {
        case GET_CARDS:
            return {...state,
                cards:payload,
                memorie:payload
            }
        case SEARCH_CARDS:
            return{
                ...state,
                cards:payload
            }
    
        default:
            return{...state}
           
    }
}


export default rootReducer;