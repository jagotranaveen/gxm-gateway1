import React from "react";

import GlobalEntitiesTable from "./GlobalEnttitiesTable";
import "./globalentities.scss";

const GlobalEntities = () => {
  return (
    <>
      <p className="general-info-paragraph">
        Find all the entities under management in one place. Quickly search,
        filter, and access essential information for efficient management.
      </p>

      <div className="card">
        <GlobalEntitiesTable />
      </div>
    </>
  );
};

export default GlobalEntities;
