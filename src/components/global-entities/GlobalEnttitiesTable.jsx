import React, { useEffect, useState, useMemo } from "react";
import { DataTable } from "primereact/datatable";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import useGlobalEntitiesTable from "./useGlobalEntitiesTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchGlobalEntityDetails } from "../global-entities/globalEntitiesSlice";
import ReactCountryFlag from "react-country-flag";
import Filter from "../filter/Filter";
import "./globalentities.scss";
import active from "../../assets/active-status.svg";
import incompolete from "../../assets/incomplete-status.svg";
import actionRequired from "../../assets/action-required-status.svg";
import dormatStatus from "../../assets/dormant-status.svg";
import { getName } from "country-list";

const GlobalEntitiesTable = () => {
  const dispatch = useDispatch();
  const [filteredEntities, setFilteredEntities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    country: [],
    entity_type: [],
    account_manager: [],
  });

  const allEntities = useSelector((state) => state.globalEntities.entities);
  const generalStatus = useSelector((state) => state.globalEntities.status);
  const error = useSelector((state) => state.globalEntities.error);

  useEffect(() => {
    dispatch(fetchGlobalEntityDetails());
  }, [dispatch]);

  useEffect(() => {
    applyFilters();
    console.log("filteredEntities===========", filteredEntities)
  }, [allEntities, selectedFilters, searchQuery]);

  const { first, rows, onPageChange, handleDownloadCSV } =
    useGlobalEntitiesTable();

  const handleCountryFlag = (rowData) => {
    return (
      <div className="country-tag">
        <ReactCountryFlag countryCode={rowData.country} svg />
        <span style={{ textTransform: "capitalize", marginLeft: "7px" }}>
          {getName(rowData.country)}
        </span>
      </div>
    );
  };

  const filterOptions = useMemo(() => {
    const countries = Array.from(
      new Set(allEntities.map((entity) => entity.country))
    );
    const types = Array.from(new Set(allEntities.map((entity) => entity.type)));
    const accountManagers = Array.from(
      new Set(allEntities.map((entity) => entity.accountManager?.name))
    );

    return [
      {
        name: "Country",
        id: "country",
        suboptions: countries.map((country) => ({
          name: handleCountryFlag({ country }),
          code: country,
        })),
      },
      {
        name: 'Entity type',
        id: "entity_type",
        suboptions: types.map((type) => ({ name: type, code: type })),
      },
      {
        name: 'Account Manager',
        id: "account_manager",
        suboptions: accountManagers.map((manager) => ({
          name: manager,
          code: manager,
        })),
      },
    ];
  }, [allEntities]);

  const applyFilters = () => {
    let filtered = allEntities;

    if (selectedFilters.country.length > 0) {
      filtered = filtered.filter((entity) =>
        selectedFilters.country.includes(entity.country)
      );
    }

    if (selectedFilters.entity_type.length > 0) {
      filtered = filtered.filter((entity) =>
        selectedFilters.entity_type.includes(entity.type)
      );
    }

    if (selectedFilters.account_manager.length > 0) {
      filtered = filtered.filter((entity) =>
        selectedFilters.account_manager.includes(
          entity.accountManager?.name
        )
      );
    }

    if (searchQuery) {
      filtered = filtered.filter((entity) => {
        if( entity.name?.toLowerCase().includes(searchQuery) ||
        entity.parentCompany?.name.toLowerCase().includes(searchQuery) ||
        entity.type?.toLowerCase().includes(searchQuery) ||
        getName(entity.country)?.toLowerCase().includes(searchQuery) || 
        entity.region?.toLowerCase().includes(searchQuery) || 
        entity.pointContact?.name?.toLowerCase().includes(searchQuery) || 
        entity.accountManager?.name?.toLowerCase().includes(searchQuery)){
          return entity
        }
      }
      );
    }
    setFilteredEntities(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };
  

  if (generalStatus === "loading") {
    return <p>Loading...</p>;
  }

  if (generalStatus === "failed") {
    return <p>Error: {error}</p>;
  }

  const handleOnboardNewEntity = () => {
    console.log("Onboard New Entity clicked");
  };

  const handleStatusTemplate = (rowData) => {
    if (!rowData.status) {
      return null;
    }

    const statusIcons = {
      active: <img src={active} alt="Active" />,
      'action-required': <img src={actionRequired} alt="Action Required" />,
      incomplete: <img src={incompolete} alt="Incomplete" />,
      'non-compliant': <img src={incompolete} alt="Non Compliant" />,
      dormant: <img src={dormatStatus} alt="Dormant" />,
    };

    const statusIcon = statusIcons[rowData.status];

    return (
      <div className="status-tag">
        {statusIcon}
        <span style={{ textTransform: "capitalize", marginLeft: "7px" }}>
          {rowData.status}
        </span>
      </div>
    );
  };

  return (
    <>
      <div className="formgrid grid justify-content-between">
        <div
          className="field col-5 mb-0 pl-0"
          style={{ paddingBottom: "24px" }}
        >
          <div className="input-wrapper-container">
            <span className="pi pi-search"></span>
            <input
                type="text"
                placeholder="Search entity by name, parent company, type or country"
                className=" appearance-none outline-none w-full"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            <span className="pi pi-search"></span>
          </div>
        </div>
        <div className="field col-6 mb-0">
          <div className="flex align-items-center justify-content-end gap-2">
            <Filter
              FilterOptions={filterOptions}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />

            <button
              className="btn download-csv"
              onClick={() => handleDownloadCSV(filteredEntities)}
            >
              <span>Download as CSV</span>
              <i className="pi pi-download ml-2"></i>
            </button>
            <button
              className="btn onboard-entity"
              onClick={handleOnboardNewEntity}
            >
              <span>Onboard New Entity</span>
              <i className="pi pi-plus ml-2"></i>
            </button>
          </div>
        </div>
        <Card className="gen-card h-full w-full">
          <div className="field col-12 table-section">
            <div className="card">
              <DataTable
                value={filteredEntities}
                sortMode="multiple"
                tableStyle={{ minWidth: "50rem" }}
                paginator
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                first={first}
                rows={rows}
                onPage={onPageChange}
                rowsPerPageOptions={[10, 20, 30]}
                className="datatable-right-align"
                emptyMessage="No results were found"
              >
                <Column
                  field="name"
                  header="Registered Name"
                  sortable
                  className="table-col-width"
                ></Column>
                <Column
                  field="type"
                  header="Type"
                  sortable
                  className="table-col-width"
                ></Column>
                <Column
                  header="Country"
                  sortable
                  className="table-col-width"
                  body={handleCountryFlag}
                ></Column>
                <Column
                  field="region"
                  header="Region"
                  sortable
                  className="table-col-width"
                ></Column>
                <Column
                  field="name"
                  header="Parent Company"
                  sortable
                  className="table-col-width"
                ></Column>
                <Column
                  field="status"
                  header="Status"
                  sortable
                  className="table-col-width"
                  body={handleStatusTemplate}
                ></Column>
                <Column
                  field="accountManager.name"
                  header="Account Manager"
                  sortable
                  className="table-col-width"
                  body={(rowData) => rowData.accountManager?.name}
                ></Column>
                <Column
                  field="pointContact.name"
                  header="Point of Contact"
                  sortable
                  className="table-col-width"
                  body={(rowData) => rowData.pointContact?.name}
                ></Column>
              </DataTable>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default GlobalEntitiesTable;
