import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./dashboard/company/store";
import authReducer from "../components/HomePage/store"
const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
   
  },
});

export default store;
