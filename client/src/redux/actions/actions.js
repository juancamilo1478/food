import axios from 'axios'

//ACTIONS
export const GET_CARDS="GET_CARDS";
export const SEARCH_CARDS="SEARCH_CARDS";
export const ORDER="ORDER";
export const DIETS="DIETS";
export const FILTERS="FILTERS";
export const RESET="RESET";
export const DETAIL_ID="DETAIL_ID";

//// paginado
const paginado=(data)=>{
  const tamaño = 9;
  let newarray = [];
    for (var i = 0; i < data.length; i += tamaño) {
      const oneDate = data.slice(i, i + tamaño);
      newarray.push(oneDate);
    }
    return newarray
}
//// all diets name
export const listfilters=()=>{
    return async(dispatch)=>{
        const response=await axios('http://localhost:3001/diets')
        return dispatch({
            type:DIETS,
            payload:response.data
        })
    }
}
/// get 100 data in the api
export const getcards=()=>{
    return async(dispatch)=>{
        const response=await axios('http://localhost:3001/cards')

    const datapaginada=paginado(response.data)
        return dispatch({
            type:GET_CARDS,
            payload:datapaginada
        })
    }
}
// search for name
export const searchcards=(name)=>{
     return async(dispatch)=>{
        const response=await axios(`http://localhost:3001/recipes?name=${name}`)



console.log(response.data)
const datapaginada=paginado(response.data)
        return dispatch({
            type:SEARCH_CARDS,
            payload:datapaginada
        })
}
}
// order data for points or A-Z AND Z-A
export const orderdata=(data)=>{
    const datapaginada=paginado(data)
    return {
        type:ORDER,
        payload:datapaginada
    }
}

//filtrado
export const filtrar=(data)=>{
    const datapaginada=paginado(data)
    return {
        type:FILTERS,
        payload:datapaginada
    }
}

export const reset=()=>{
    return {
        type:RESET,
        payload:""
    }
}
///////////////////
export const detaildata=(id)=>{
    console.log(id.toString())
    return async(dispatch)=>{
        try{
         const response=await axios(`http://localhost:3001/recipes/${id}`)
        console.log(response.data)
        return dispatch({
            type:DETAIL_ID,
            payload:response.data
        })
        }catch(error){
            return {
            type:DETAIL_ID,
            payload:{error:"no cargo"}
        }
        }
      
    }
}

