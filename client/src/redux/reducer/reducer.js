import { DETAIL_ID, DIETS, FILTERS, GET_CARDS, ORDER, RESET, SEARCH_CARDS } from "../actions/actions";


const initialState={
    cards:[],
    memorie:[],
    diets:[],
    detail:[]
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
        case ORDER:
            return{
                ...state,
                cards:payload
            }
        case DIETS:
            return{
                ...state,
                diets:payload
            }
        case FILTERS:
            return{
                ...state,
                cards:payload
            }

        case RESET:
            return{
                ...state,
                cards:state.memorie
            }

        case DETAIL_ID:
            return{
                ...state,
                detail:payload
            }


        default:
            return{...state}
           
    }
}


export default rootReducer;