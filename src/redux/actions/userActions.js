import axios from 'axios';

const getTokenFromStateOrStorage = (getState) => {
  const state = getState();
  if (state.auth && state.auth.userInfo && state.auth.userInfo.token) {
    return state.auth.userInfo.token;
  }
  return localStorage.getItem('token');
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USERS_REQUEST' });

    const token = getTokenFromStateOrStorage(getState);
    if (!token) throw new Error('No token found');

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.get('http://localhost:8000/api/users', config);

    dispatch({ type: 'USERS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USERS_FAIL',
      payload: error.response?.data?.msg || error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USER_DETAILS_REQUEST' });

    const token = getTokenFromStateOrStorage(getState);
    if (!token) throw new Error('No token found');

    const config = { headers: { Authorization: `Bearer ${token}` } };

    const { data } = await axios.get(`http://localhost:8000/api/users/${id}`, config);

    dispatch({ type: 'USER_DETAILS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_DETAILS_FAIL',
      payload: error.response?.data?.msg || error.message,
    });
  }
};

export const createUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USER_CREATE_REQUEST' });

    const token = getTokenFromStateOrStorage(getState);
    if (!token) throw new Error('No token found');

    const config = {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
    };

    const { data } = await axios.post('http://localhost:8000/api/users', user, config);

    dispatch({ type: 'USER_CREATE_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_CREATE_FAIL',
      payload: error.response?.data?.msg || error.message,
    });
  }
};

export const updateUser = (id, user) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USER_UPDATE_REQUEST' });

    const token = getTokenFromStateOrStorage(getState);
    if (!token) throw new Error('No token found');

    const config = {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
    };

    const { data } = await axios.put(`http://localhost:8000/api/users/${id}`, user, config);

    dispatch({ type: 'USER_UPDATE_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_UPDATE_FAIL',
      payload: error.response?.data?.msg || error.message,
    });
  }
};

export const deleteUserById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USER_DELETE_REQUEST' });

    const token = getTokenFromStateOrStorage(getState);
    if (!token) throw new Error('No token found');

    const config = { headers: { Authorization: `Bearer ${token}` } };

    await axios.delete(`http://localhost:8000/api/users/${id}`, config);

    dispatch({ type: 'USER_DELETE_SUCCESS' });
  } catch (error) {
    dispatch({
      type: 'USER_DELETE_FAIL',
      payload: error.response?.data?.msg || error.message,
    });
  }
};

export const resetUserSuccess = () => ({ type: 'USER_RESET_SUCCESS' });
