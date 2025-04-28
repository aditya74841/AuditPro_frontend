import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./dashboard/company/store";
import authReducer from "../components/HomePage/store"
import storeReducer from "../../src/app/dashboard/stores/store"
const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    store:storeReducer
   
  },
});

export default store;
