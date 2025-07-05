import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./dashboard/company/store";
import authReducer from "../components/HomePage/store";
import storeReducer from "../../src/app/dashboard/stores/store";
import staffReducer from "../../src/app/dashboard/staff/store";
import auditReducer from "../../src/app/dashboard/audits/store";
import responseReducer from "../../src/app/dashboard/responses/store";
const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
    store: storeReducer,
    staff: staffReducer,
    audit: auditReducer,
    response: responseReducer,
  },
});

export default store;
