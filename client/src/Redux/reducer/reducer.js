const initialState = {
  videogames: [],
  search: [],
  genres: [],
  platforms: [],
  loading: false,
  currentPage: 1,
  videogamesPerPage: 20,
  filters: {
    order: "",
    origen: "",
    genre: "",
    platform: "",
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_GM":
      return {
        ...state,
        videogames: action.payload,
      };
    case "SH_GM":
      return {
        ...state,
        search: action.payload,
      };
    case "ST":
      return {
        ...state,
        loading: action.payload,
      };

    case "PAG":
      return {
        ...state,
        currentPage: action.payload,
      };
      case "FILTER_ORDER": {
        return {
            ...state,
            filters: {
                ...state.filters,
            order: action.payload
            }
        }
      };
      case "FILTER_GENRE": {
        return {
            ...state,
            filters: {
                ...state.filters,
            genre: action.payload
            }
        }
      };
      case "FILTER_PLATFORM": {
        return {
            ...state,
            filters: {
                ...state.filters,
            platform: action.payload
            }
        }
      };
      case "RESET_FILTER": {
        return {
          ...state,
          filters: {
            order: "",
            origen: "",
            genre: "",
            platform: ""
          }
        }
      }
    case "GEN":
      return {
        ...state,
        genres: [...action.payload],
      };
    case "PLA":
      return {
        ...state,
        platforms: [...action.payload],
      };
    default:
      return state;
  }
}

export default reducer;
