import axios from 'axios'

export const addGame =(payload)=>{
    return{
        type:'ADD_GM',
        payload:payload
    }
};

export const addGenres = (payload) =>{
    return{
        type:'GEN',
        payload:payload
    }
}
export const addPlatforms = (payload) =>{
    return{
        type:'PLA',
        payload:payload
    }
}
export const searchGame = (name) => async (dispatch) =>{
  
   const response = await axios.get(`http://localhost:3001/videogames?search=${name}`)
   const juegos = await response.data
   if(response.status === 200){
    dispatch({ type: 'SH_GM', payload: juegos});

} else {
  dispatch({ type: "SH_GM", payload: []});
};
}

export const clearSearch = (payload) =>{
    console.log(payload)
    return{
        type:'SH_GM',
        payload: payload
    }
}

export const loadingGame = (state)=>{
    return{
        type: 'ST',
        payload: state
    }
}


export const paginate = (payload) => ({
    type: 'PAG',
  payload: payload,
});

export const currentP= (payload) =>{
    return{
        type: 'CURPAG',
        payload:payload
    }
}

export const filterOrder = ( payload ) => {
    return {
        type: 'FILTER_ORDER',
        payload: payload
    }
}

export const filterGenre = ( payload ) => {
    return {
        type: 'FILTER_GENRE',
        payload: payload
    }
}

export const filterPlatform = ( payload ) => {
    return {
        type: 'FILTER_PLATFORM',
        payload: payload
    }
}

export const resetFilters = () => {
    return {
        type: 'RESET_FILTER'
    }
}