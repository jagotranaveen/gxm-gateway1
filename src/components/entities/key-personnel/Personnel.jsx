import React from "react";
import { Card } from "primereact/card";
import PersonnelTable from "./PersonnelTable";
import usePersonnelTable from "./usePersonnelTable";
import EditContactDialog from "./EditContactDialog";
import { EntityApiRoutes } from "../../../api-routes";
import { useDispatch } from "react-redux";
import { fetchPersonnel } from "./personnelSlice";
import apiService from "../../../services/service";

const Personnel = () => {
  const dispatch = useDispatch();

  const {
    editVisible,
    setEditVisible,
    rowToEdit,
    setRowToEdit,
    showAddDialog,
    isAddMode,
    successMessage,
    setSuccessMessage,
  } = usePersonnelTable();

  const handleAddNewContact = () => {
    showAddDialog();
  };

  const handleSave = async (formData) => {
    const personnelData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      role: formData.role,
      entity: "19917e74-0217-45c7-aa90-6f891a48a147",
      email: formData.email,
      phone: formData.phone,
      phone_code: formData.phone_code,
      department: formData.department,
      country: formData.country || null,
    };
    const apiRoute = isAddMode ? EntityApiRoutes.ADD_PERSONNEL : "";

    try {
      const Response = await apiService(apiRoute, 'POST', {
        body: JSON.stringify(personnelData),
      });
      const Data = await Response.json();

      if (Data) {
        dispatch(fetchPersonnel());
        setSuccessMessage("New Key Personnel has been added.");
      } else {
        setSuccessMessage("Failed to save contact details");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setEditVisible(false);
  };

  return (
    <>
      <Card className="gen-card h-full">
        <div className="general-info-container flex justify-content-between formgrid grid grid-nogutter">
          <div>
            <p className="general-info">Key Personnel</p>
            <p className="general-info-para">
              Contact key personnel directly. Find contact information here.
            </p>
          </div>
          <button className="add-new-contact" onClick={handleAddNewContact}>
            Add New Contact<span className="pi pi-user-plus mb-1 ml-2"></span>
          </button>
        </div>
        <div className="card">
          <PersonnelTable
            onAddContactClick={handleAddNewContact}
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
          />
        </div>
      </Card>

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

export default Personnel;
