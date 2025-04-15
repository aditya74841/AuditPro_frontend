import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Create the auth slice
export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    accessToken: "",
    refreshToken: "",
    isLoggedIn: false,
    profile: {},
    error: null,
    message: null,
    profileUrl:""
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setProfileUrl: (state, action) => {
      state.profileUrl = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const {
  setLoading,
  setAccessToken,
  setRefreshToken,
  setIsLoggedIn,
  setProfile,
  setError,
  setMessage,
  setProfileUrl
} = AuthSlice.actions;

// Function to register user

export const userRegister = (payload, callback) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(
      `${process.env.USER_SERVER_URL}/register`,
      payload
    );
    dispatch(setLoading(false));
    if (callback) callback(null, response.data);
  } catch (error) {
    dispatch(setLoading(false));
    if (callback) callback(error, null);
  }
};

//Function to handle staff Register

export const staffRegister = (payload, callback) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(
      `${process.env.USER_SERVER_URL}/register-user-staff`,
      payload,
      {
        withCredentials: true,
      }
    );
    dispatch(setLoading(false));
    if (callback) callback(null, response.data);
  } catch (error) {
    dispatch(setLoading(false));
    if (callback) callback(error, null);
  }
};

// Async action for user login
export const userLogin = (projectData, callback) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.post(
      `${process.env.USER_SERVER_URL}/login`,
      projectData,
      {
        withCredentials: true,
      }
    );
    dispatch(setAccessToken(data.data.accessToken));
    dispatch(setRefreshToken(data.data.refreshToken));
    dispatch(setIsLoggedIn(true));
    // dispatch(setProfile(data.data.user));
    dispatch(setMessage(data.message));
    if (callback) callback(null, data);
  } catch (error) {
    if (callback) callback(error, null);
    dispatch(setMessage(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Async action for fetching user profile
export const userProfile = (callback) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // const state = getState();
    // const { accessToken } = state.auth; // Assuming accessToken is stored in auth slice

    const { data } = await axios.get(
      `${process.env.USER_SERVER_URL}/current-user`,
      {
        withCredentials: true,
      }
    );

    console.log("The Profile Data fetched from  ", data.data.avatar
.url    );
dispatch(setProfileUrl(data.data.avatar
  .url ))
    dispatch(setLoading(false));
    dispatch(setProfile(data.data));
    if (callback) callback(null, data);
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
    if (callback) callback(error, null);
  } finally {
    dispatch(setLoading(false));
  }
};

// Function to handle Logout

export const handleLogout = (callback) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${process.env.USER_SERVER_URL}/logout`, {
      withCredentials: true,
    });
    dispatch(setLoading(false));
    if (callback) callback(null, response.data);
  } catch (error) {
    dispatch(setLoading(false));
    if (callback) callback(error, null);
  }
};

// Function To handle forgotpassword method

export const sendForgetPasswordMail =
  (payload, callback) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        `${process.env.USER_SERVER_URL}/forgot-password`,
        payload
      );
      dispatch(setLoading(false));
      if (callback) callback(null, response.data);
    } catch (error) {
      dispatch(setLoading(false));
      if (callback) callback(error, null);
    }
  };

// Function to handle Chnage current Password
export const changeCurrentPassword =
  (payload, callback) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        `${process.env.USER_SERVER_URL}/change-password`,
        payload,
        { withCredentials: true }
      );
      dispatch(setLoading(false));
      if (callback) callback(null, response.data);
    } catch (error) {
      dispatch(setLoading(false));
      if (callback) callback(error, null);
    }
  };

export default AuthSlice.reducer;
