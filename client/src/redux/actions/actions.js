import axios from 'axios'
//ACTIONS
export const GET_CARDS="GET_CARDS";
export const SEARCH_CARDS="SEARCH_CARDS";


const paginado=(data)=>{
  const tamaño = 9;
  let newarray = [];
    for (var i = 0; i < data.length; i += tamaño) {
      const oneDate = data.slice(i, i + tamaño);
      newarray.push(oneDate);
    }
    return newarray
}

export const getcards=()=>{
    return async(dispatch)=>{
        const response=await axios('http://localhost:3001/cards')
    //     const tamaño = 9;
    //     let newarray = [];
    // for (var i = 0; i < response.data.length; i += tamaño) {
    //   const oneDate = response.data.slice(i, i + tamaño);
    //   newarray.push(oneDate);
    // }
    const datapaginada=paginado(response.data)
        return dispatch({
            type:GET_CARDS,
            payload:datapaginada
        })
    }
}

export const searchcards=(name)=>{
     return async(dispatch)=>{
        const response=await axios(`http://localhost:3001/recipes?name=${name}`)

        for(let i = 0; i < response.data.length; i++) {
  // Agregar los dos nuevos atributos con los mismos valores
  response.data[i].level = "?";
  response.data[i].diets = ["?"];
  response.data[i].name=response.data[i].title;
  delete response.data[i].title;
}
//pagination whitchdata
const datapaginada=paginado(response.data)


        return dispatch({
            type:SEARCH_CARDS,
            payload:datapaginada
        })
}
}



