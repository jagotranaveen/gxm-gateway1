import React from "react";
import usePersonnelTable from "./usePersonnelTable";
import EditContactDialog from "./EditContactDialog";
import { EntityApiRoutes } from "../../../api-routes";
import { fetchPersonnel } from "./personnelSlice";
import { useDispatch } from "react-redux";

const NoKeyPersonnel = () => {
  const dispatch = useDispatch();
  const {
    editVisible,
    setEditVisible,
    rowToEdit,
    setRowToEdit,
    showAddDialog,
    isAddMode,
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
      const Response = await fetch(apiRoute, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
      <div className="formgrid grid flex justify-content-center align-item-center">
        <div className="no-key-container">
          <div>
            <svg
              width="136"
              height="137"
              viewBox="0 0 136 137"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_4853_57936)">
                <rect
                  x="12"
                  y="10.5"
                  width="112"
                  height="112"
                  rx="40"
                  fill="white"
                  shapeRendering="crispEdges"
                />
                <path
                  d="M48 34.5H84C88.375 34.5 92 38.125 92 42.5V90.5C92 95 88.375 98.5 84 98.5H48C43.5 98.5 40 95 40 90.5V42.5C40 38.125 43.5 34.5 48 34.5ZM62 70.5C56.375 70.5 52 75 52 80.5C52 81.625 52.875 82.5 54 82.5H78C79 82.5 80 81.625 80 80.5C80 75 75.5 70.5 70 70.5H62ZM58 58.5C58 61.375 59.5 64 62 65.5C64.375 66.875 67.5 66.875 70 65.5C72.375 64 74 61.375 74 58.5C74 55.75 72.375 53.125 70 51.625C67.5 50.25 64.375 50.25 62 51.625C59.5 53.125 58 55.75 58 58.5ZM100 44.5V52.5C100 53.625 99 54.5 98 54.5C96.875 54.5 96 53.625 96 52.5V44.5C96 43.5 96.875 42.5 98 42.5C99 42.5 100 43.5 100 44.5ZM98 58.5C99 58.5 100 59.5 100 60.5V68.5C100 69.625 99 70.5 98 70.5C96.875 70.5 96 69.625 96 68.5V60.5C96 59.5 96.875 58.5 98 58.5ZM100 76.5V84.5C100 85.625 99 86.5 98 86.5C96.875 86.5 96 85.625 96 84.5V76.5C96 75.5 96.875 74.5 98 74.5C99 74.5 100 75.5 100 76.5Z"
                  fill="#188A42"
                />
                <path
                  opacity="0.4"
                  d="M48 34.5H84C88.375 34.5 92 38.125 92 42.5V90.5C92 95 88.375 98.5 84 98.5H48C43.5 98.5 40 95 40 90.5V42.5C40 38.125 43.5 34.5 48 34.5ZM62 70.5C56.375 70.5 52 75 52 80.5C52 81.625 52.875 82.5 54 82.5H78C79 82.5 80 81.625 80 80.5C80 75 75.5 70.5 70 70.5H62ZM58 58.5C58 61.375 59.5 64 62 65.5C64.375 66.875 67.5 66.875 70 65.5C72.375 64 74 61.375 74 58.5C74 55.75 72.375 53.125 70 51.625C67.5 50.25 64.375 50.25 62 51.625C59.5 53.125 58 55.75 58 58.5ZM100 44.5V52.5C100 53.625 99 54.5 98 54.5C96.875 54.5 96 53.625 96 52.5V44.5C96 43.5 96.875 42.5 98 42.5C99 42.5 100 43.5 100 44.5ZM98 58.5C99 58.5 100 59.5 100 60.5V68.5C100 69.625 99 70.5 98 70.5C96.875 70.5 96 69.625 96 68.5V60.5C96 59.5 96.875 58.5 98 58.5ZM100 76.5V84.5C100 85.625 99 86.5 98 86.5C96.875 86.5 96 85.625 96 84.5V76.5C96 75.5 96.875 74.5 98 74.5C99 74.5 100 75.5 100 76.5Z"
                  fill="#188A42"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_4853_57936"
                  x="0"
                  y="0.5"
                  width="136"
                  height="136"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="2" />
                  <feGaussianBlur stdDeviation="6" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_4853_57936"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_4853_57936"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          <p className="no-key-personnel mb-2">No key Personnel registered</p>
          <p className="no-key-personnel-para">
            Add your first contact to build your address book.
          </p>
          <button className="add-new-contact" onClick={handleAddNewContact}>
            {" "}
            Add New Contact<span className="pi pi-user-plus mb-1 ml-2"></span>
          </button>
        </div>
      </div>

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

export default NoKeyPersonnel;
