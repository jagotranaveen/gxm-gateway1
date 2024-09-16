import { configureStore } from "@reduxjs/toolkit";
import generalInformationReducer from "./components/entities/general-information/generalInformationSlice";
import bankDetailsReducer from "./components/entities/bank-details/bankDetailsSlice";
import addressesReducer from "./components/entities/address/addressesSlice";
import counterReducer from "./components/counter/counterSlice";
import myEntityReducer from "./Pages/MyEntityDashboard/myEntityDashboardSlice";
import inviteModalReducer from "./components/settings/user-management/invite-modal/InviteModalSlice";
import documentsGridReducer from "./components/entities/documents-grid/documentsGridSlice";
import globalEntitiesReducer from "./components/global-entities/globalEntitiesSlice";
import personnelReducer from "./components/entities/key-personnel/personnelSlice";

export const store = configureStore({
  reducer: {
    generalInformation: generalInformationReducer,
    bankDetails: bankDetailsReducer,
    addresses: addressesReducer,
    personnel: personnelReducer,
    counter: counterReducer,
    myentitydashboard: myEntityReducer,
    inviteusers: inviteModalReducer,
    documentsGrid: documentsGridReducer,
    globalEntities: globalEntitiesReducer,
  },
});
