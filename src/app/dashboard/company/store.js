import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const CompanySlice = createSlice({
  name: "company",
  initialState: {
    loading: false,
    companies: [],
    selectedCompany: null,
    message: "",
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setSelectedCompany: (state, action) => {
      state.selectedCompany = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setCompanies,
  setSelectedCompany,
  setMessage,
  setError,
} = CompanySlice.actions;

// Create Company
export const createCompany = (companyData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.post(
      `${process.env.MASTER_SERVER_URL}/company`,
      companyData,
      { withCredentials: true }
    );
    dispatch(setMessage(data.message));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Get All Companies
export const fetchCompanies = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(
      `${process.env.MASTER_SERVER_URL}/company`,
      { withCredentials: true }
    );
    dispatch(setCompanies(data.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Get Company by ID
export const getCompanyById = (companyId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(
      `${process.env.MASTER_SERVER_URL}/company/${companyId}`,
      { withCredentials: true }
    );
    dispatch(setSelectedCompany(data.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Update Company
export const updateCompany = (companyId, companyData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.patch(
      `${process.env.MASTER_SERVER_URL}/company/${companyId}`,
      companyData,
      { withCredentials: true }
    );
    dispatch(setMessage(data.message));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Delete Company
export const deleteCompany = (companyId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.delete(
      `${process.env.MASTER_SERVER_URL}/company/${companyId}`,
      { withCredentials: true }
    );
    dispatch(setMessage(data.message));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default CompanySlice.reducer;
