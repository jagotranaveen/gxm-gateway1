import React, { useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import usePersonnelTable from "./usePersonnelTable";
import EditContactDialog from "./EditContactDialog";
import DeleteDialog from "./DeleteDialog";
import Notification from "../notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import { fetchPersonnel, resetPersonnel } from "./personnelSlice";
import { Dropdown } from "primereact/dropdown";
import { EntityApiRoutes } from "../../../api-routes";
import NoKeyPersonnel from "./NoKeyPersonnel";
import apiService from "../../../services/service";

const PersonnelTable = ({ successMessage, setSuccessMessage }) => {
  const dispatch = useDispatch();

  const personnel = useSelector((state) => state.personnel.personnel);

  const generalStatus = useSelector((state) => state.personnel.status);

  useEffect(() => {
    if (generalStatus === "idle") {
      setLoading(true);
      dispatch(fetchPersonnel()).then(() => setLoading(false));
    }
  }, [generalStatus, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetPersonnel());
    };
  }, []);

  const {
    visible,
    setVisible,
    editVisible,
    setEditVisible,
    isAddMode,
    rowToEdit,
    setRowToEdit,
    message,
    setMessage,
    first,
    rows,
    onPageChange,
    showEditDialog,
    showDeleteDialog,
    deleteRow,
    searchDataArr,
    searchTerm,
    setSearchTerm,
    loading,
    setLoading,
    editMessage,
    setEditMessage,
    department,
    selectedDepartment,
    setSelectedDepartment,
    location,
    selectedLocation,
    setSelectedLocation,
    rowToDelete,
  } = usePersonnelTable(personnel || []);

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center">
        <span
          className="pi pi-pencil ml-4 mr-3 pencil-pointer"
          onClick={() => showEditDialog(rowData)}
        ></span>
        <span
          className="pi pi-trash mr-6 pencil-pointer"
          onClick={() => showDeleteDialog(rowData)}
        ></span>
      </div>
    );
  };

  const handleSave = async (formData) => {
    const personnelData = {
      ...rowToEdit,
      ...formData,
    };

    try {
      const data = await apiService(EntityApiRoutes.UPDATE_PERSONNEL, 'POST', {
        replace: { id: personnelData.id },
        body: JSON.stringify(personnelData),
      });

      if (data.status) {
        dispatch(fetchPersonnel());
        setEditMessage("Key Personnel has been updated.");
      } else {
        setEditMessage(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setEditMessage("An error occurred while saving contact details");
    }

    setEditVisible(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedDepartment("");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {searchDataArr &&
      searchDataArr.length === 0 &&
      !searchTerm &&
      !selectedDepartment ? (
        <NoKeyPersonnel />
      ) : (
        <div className="formgrid grid">
          <div className="field col-6 mb-0 pl-0">
            <div className="input-wrapper ml-2">
              <span className="pi pi-search span-left"></span>
              <input
                type="text"
                placeholder="Search contact by name, last name, role, email.."
                className="input-field appearance-none outline-none w-full"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <span className="pi pi-search span-right"></span>
            </div>
          </div>
          <div className="field col-6 mb-0">
            <div className="flex align-items-center justify-content-end gap-2">
              <p className="filter-by">Filter By </p>
              <Dropdown
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.value);
                  setSearchTerm("");
                }}
                options={location}
                optionLabel="label"
                placeholder="All Locations"
                className="w-full md:w-11rem"
              />
            </div>
          </div>
          <Notification
            message={message}
            setMessage={setMessage}
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
            editMessage={editMessage}
            setEditMessage={setEditMessage}
          />
          <div className="field col-12 table-section">
            <div className="card">
              <DataTable
                value={searchDataArr}
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
                  field="first_name"
                  body={(rowData) =>
                    `${rowData.first_name} ${rowData.last_name}`
                  }
                  header="Full Name"
                  sortable
                  className="table-col-width"
                ></Column>
                <Column
                  field="role"
                  header="Role"
                  sortable
                  className="table-col-width"
                ></Column>
                <Column
                  field="email"
                  header="Email"
                  sortable
                  className="table-col-width"
                ></Column>
                <Column
                  field="phone_code"
                  body={(rowData) => `+${rowData.phone_code} ${rowData.phone}`}
                  header="Phone Number"
                  sortable
                  className="table-col-width"
                ></Column>
                <Column
                  field="country"
                  header="Location"
                  sortable
                  className="table-col-width"
                ></Column>
                <Column
                  body={actionBodyTemplate}
                  className="table-col-width"
                ></Column>
              </DataTable>
            </div>
          </div>
        </div>
      )}
      <DeleteDialog
        visible={visible}
        onHide={() => setVisible(false)}
        onConfirm={deleteRow}
        rowToDelete={rowToDelete}
      />

      <EditContactDialog
        visible={editVisible}
        onHide={() => setEditVisible(false)}
        rowToEdit={rowToEdit}
        setRowToEdit={setRowToEdit}
        onSave={handleSave}
        isAddMode={isAddMode}
      />
    </>
  );
};

export default PersonnelTable;
