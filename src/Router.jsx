import React from "react";
import { Routes, Route } from "react-router-dom";
// import Dashboard from "./Pages/Dashboard"; // Replace with your actual Home component
import GlobalEntitiesList from "./components/global-entities/GlobalEntities";
import About from "./Pages/About"; // Replace with your actual About component
import Entities from "./Pages/Entities";
import MyEntityDashboard from "./Pages/MyEntityDashboard";
import GeneralInformation from "./components/entities/general-information/GeneralInformation";
import Addresses from "./components/entities/address/Addresses";
import BankDetails from "./components/entities/bank-details/BankDetails";
import DocumentsGrid from "./components/entities/documents-grid/DocumentsGrid";
import Settings from "./Pages/Settings";
import MyProfile from "./components/settings/my-profile/MyProfile";
import Notifications from "./components/settings/notifications/Notifications";
import UserManagement from "./components/settings/user-management/UserManagement";
import EntityOnboard from './Pages/EntityOnboard'
import Personnel from "./components/entities/key-personnel/Personnel";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MyEntityDashboard />} />
      <Route path="/dashboard" element={<MyEntityDashboard />} />
      <Route path="/global-entities" element={<GlobalEntitiesList />} />
      <Route path="/entities" element={<Entities />}>
        <Route
          path="/entities/general-information"
          element={<GeneralInformation />}
        />
        <Route path="/entities/addresses" element={<Addresses />} />
        <Route path="/entities/bank-details" element={<BankDetails />} />
        <Route path="/entities/key-personnel" element={<Personnel />} />
        <Route path="/entities/documents-grid" element={<DocumentsGrid />} />
      </Route>
      <Route path="/settings" element={<Settings />}>
        <Route path="/settings/my-profile" element={<MyProfile />} />
        <Route path="/settings/notification" element={<Notifications />} />
        <Route path="/settings/user-management" element={<UserManagement />} />
      </Route>
      {/* <Route path="/my-entities" element={<MyEntityDashboard />} /> */}
      <Route path="/about" element={<About />} />
      <Route path="/onboard" element={<EntityOnboard />} />
    </Routes>
  );
};

export default Router;
