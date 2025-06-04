import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'AUTH_LOGIN_REQUEST' });

    const response = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("Respuesta login:", data);

    if (!response.ok || !data.user) {
      dispatch({ type: 'AUTH_LOGIN_FAIL', payload: data.msg || 'Error desconocido' });
      return;
    }

    dispatch({ 
      type: 'AUTH_LOGIN_SUCCESS', 
      payload: data.user
    });

    localStorage.setItem('token', data.token);
    localStorage.setItem('userInfo', JSON.stringify(data.user ? data.user : data));

  } catch (error) {
    dispatch({ type: 'AUTH_LOGIN_FAIL', payload: 'Error de red. Intenta más tarde.' });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userInfo");
  dispatch({ type: "LOGOUT" });
};
