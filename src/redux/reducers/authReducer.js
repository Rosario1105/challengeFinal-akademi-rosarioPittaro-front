const initialState = {
  loading: false,
  error: null,
  userInfo: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_LOGIN_REQUEST':
      return { ...state, loading: true, error: null };
    case 'AUTH_LOGIN_SUCCESS':
        console.log('AUTH_LOGIN_SUCCESS payload', action.payload);
        
      return {...state, loading: false, userInfo: action.payload, error: null };
    case 'AUTH_LOGIN_FAIL':
      return { loading: false, error: action.payload, userInfo: null };
    default:
      return state;
  }
};

export default authReducer;