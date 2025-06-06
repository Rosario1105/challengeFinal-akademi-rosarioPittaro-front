const initialState = {
  users: [],
  loading: false,
  error: null,
  success: false,
  userDetails: null,
};

const userReducer = (state = initialState, action) => {
  switch(action.type){
    case 'USERS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'USERS_SUCCESS':
      return { ...state, loading: false, users: action.payload || []};
    case 'USERS_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'USER_DETAILS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'USER_DETAILS_SUCCESS':
      return { ...state, loading: false, userDetails: action.payload };
    case 'USER_DETAILS_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'USER_CREATE_REQUEST':
      return { ...state, loading: true, error: null, success: false };
    case 'USER_CREATE_SUCCESS':
      return { ...state, loading: false, success: true };
    case 'USER_CREATE_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'USER_UPDATE_REQUEST':
      return { ...state, loading: true, error: null, success: false };
    case 'USER_UPDATE_SUCCESS':
      return { ...state, loading: false, success: true };
    case 'USER_UPDATE_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'USER_DELETE_REQUEST':
      return { ...state, loading: true, error: null, success: false };
    case 'USER_DELETE_SUCCESS':
      return { ...state, loading: false, success: true };
    case 'USER_DELETE_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'USER_RESET_SUCCESS':
      return { ...state, success: false, error: null };

    default:
      return state;
  }
}

export default userReducer;