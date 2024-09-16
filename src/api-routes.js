export const EntityApiRoutes = {
  GENERAL_INFORMATION: "/entity/entity_id/company_information",
  REGISTER_ADDRESS: "/entity/entity_id/register_address",
  TRADING_ADDRESS: "/entity/entity_id/trading_address",
  BANK_DETAILS: "/entity/entity_id/bank_details",
  PERSONNEL: import.meta.env.VITE_API_PERSONNEL,
  ADD_PERSONNEL: import.meta.env.VITE_API_PERSONNEL_ADD,
  UPDATE_PERSONNEL: import.meta.env.VITE_API_PERSONNEL_UPDATE,
  DELETE_PERSONNEL: import.meta.env.VITE_API_PERSONNEL_DELETE,
  DOCUMENTS: import.meta.env.VITE_API_DOCUMENTS,
};

export const SettingsApiRoutes = {
  PROFILE_UPDATE: "/users/update/3",
  GET_USERS_PROFILE: "/users/3",
};

export const MyEntitiesDashboardApiRoutes = {
  COUNTRIES: "/api/entity/myentities/countries",
  ALL_ENTITIES: "/api/entity/fetchentities?code=LJmz-ek_UtgUoPP2HeHul4ffcOaax8Yn6jrRkbqGR2DIAzFug4106Q%3D%3D",
  DOWNLOAD_REPORT: "/api/entity/myentities/download_report",
  LAST_MONTH_REPORT: "/api/entity/myentities/lastmonthReport",
};
