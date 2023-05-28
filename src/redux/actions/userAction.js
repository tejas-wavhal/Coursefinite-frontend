import { server } from "../store"
import axios from "axios"

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" })

    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      {
        headers: {
          "Content-type": "application/json"
        },
        withCredentials: true,   //Whenever there is cookies involved then this should be mention mandatory cause we also have mention this is backend that (withCredentials: true )
      })

    dispatch({ type: "loginSuccess", payload: data })

  } catch (error) {
    console.log(error)
    dispatch({ type: 'loginFail', payload: error.response.data.message }) //get message from axios error
  }
}

export const register = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: "registerRequest" })

    const { data } = await axios.post(
      `${server}/register`,
      formdata,
      {
        headers: {
          "Content-type": "multipart/form-data"
        },
        withCredentials: true,
      })

    // console.log(data)

    dispatch({ type: "registerSuccess", payload: data })

  } catch (error) {
    console.log(error)
    dispatch({ type: 'registerFail', payload: error.response.data.message }) //get message from axios error
  }
}

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" })

    const { data } = await axios.get(
      `${server}/me`,
      {
        withCredentials: true,
      })

    console.log(data)

    dispatch({ type: "loadUserSuccess", payload: data.user })

  } catch (error) {
    dispatch({ type: 'loadUserFail', payload: error.response.data.message })
  }
}

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" })

    const { data } = await axios.post(
      `${server}/logout`,
      {
        withCredentials: true,
      })

    console.log(data)

    dispatch({ type: "logoutSuccess", payload: data.message })

  } catch (error) {
    dispatch({ type: 'logoutFail', payload: error.response.data.message })
  }
}

export const buySubscription = () => async dispatch => {
  try {
    dispatch({ type: 'buySubscriptionRequest' });

    const { data } = await axios.get(`${server}/subscribe`, {
      withCredentials: true,
    });

    dispatch({ type: 'buySubscriptionSuccess', payload: data.subscriptionId });
  } catch (error) {
    dispatch({
      type: 'buySubscriptionFail',
      payload: error.response.data.message,
    });
  }
};

export const cancelSubscription = () => async dispatch => {
  try {
    dispatch({ type: 'cancelSubscriptionRequest' });

    const { data } = await axios.delete(`${server}/subscribe/cancel`, {
      withCredentials: true,
    });

    dispatch({ type: 'cancelSubscriptionSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'cancelSubscriptionFail',
      payload: error.response.data.message,
    });
  }
};




export const contactUs = (name, email, message) => async dispatch => {
  try {

    dispatch({ type: 'contactRequest' })

    const { data } = await axios.post(
      `${server}/contact`,
      { name, email, message },
      {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      }
    )

    dispatch({ type: 'contactSuccess', payload: data.message })
  } catch (error) {
    dispatch({
      type: 'contactFail',
      payload: error.response.data.message,
    })
  }
}


export const courseRequest = (name, email, course) => async dispatch => {
  try {

    dispatch({ type: 'courseRequestRequest' })

    const { data } = await axios.post(
      `${server}/courserequest`,
      { name, email, course },
      {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      }
    )

    dispatch({ type: 'courseRequestSuccess', payload: data.message })
  } catch (error) {
    dispatch({
      type: 'courseRequestFail',
      payload: error.response.data.message,
    })
  }
}