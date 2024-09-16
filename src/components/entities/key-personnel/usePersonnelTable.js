import { useState, useEffect, useMemo } from "react";
import { fetchPersonnel } from "./personnelSlice";
import { useDispatch } from "react-redux";
import useDebounce from "./useDebounce";
import { EntityApiRoutes } from "../../../api-routes";
import apiService from "../../../services/service";

const usePersonnelTable = (personnel) => {
  const Personnel = useMemo(() => personnel?.data || [], [personnel]);
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [searchDataArr, setSearchDataArr] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [department, setDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [location, setLocation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Array.isArray(Personnel)) {
      setData((prevData) => {
        if (JSON.stringify(prevData) !== JSON.stringify(Personnel)) {
          return Personnel;
        }
        return prevData;
      });
    } else {
      setData([]);
    }
  }, [Personnel]);

  const filterData = (
    data,
    searchTerm,
    selectedDepartment,
    selectedLocation
  ) => {
    let filteredData = data;

    if (searchTerm !== "") {
      const lowercasedFilter = searchTerm.toLowerCase();
      filteredData = filteredData.filter((item) =>
        Object.keys(item).some((key) => {
          const value = item[key];

          if (value !== null && value !== undefined) {
            if (typeof value === "object") {
              return Object.values(value)
                .toString()
                .toLowerCase()
                .includes(lowercasedFilter);
            } else {
              return value.toString().toLowerCase().includes(lowercasedFilter);
            }
          }
          return false;
        })
      );
    }
    if (selectedDepartment) {
      const normalizedDepartment = selectedDepartment.toLowerCase();

      filteredData = filteredData.filter(
        (item) => item.department.toLowerCase() === normalizedDepartment
      );
    }

    if (selectedLocation) {
      const normalizedLocation = selectedLocation.toLowerCase();

      filteredData = filteredData.filter(
        (item) =>
          item.country &&
          typeof item.country === "string" &&
          item.country.toLowerCase() === normalizedLocation
      );
    }

    return filteredData;
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  useEffect(() => {
    if (data) {
      setSearchDataArr(
        filterData(
          data,
          debouncedSearchTerm,
          selectedDepartment,
          selectedLocation
        )
      );
    }
  }, [debouncedSearchTerm, data, selectedDepartment, selectedLocation]);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  useEffect(() => {
    if (data) {
      const departments = [
        ...new Set(data.map((item) => item.department?.toLowerCase())),
      ];
      setDepartment(departments);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const locations = [
        ...new Set(
          data
            .map((item) => item.country?.toUpperCase())
            .filter((location) => location !== undefined)
        ),
      ].map((location) => ({ label: location, value: location }));
      setLocation(locations);
    }
  }, [data]);

  const showEditDialog = (rowData) => {
    setRowToEdit(rowData);
    setEditVisible(true);
  };

  const showAddDialog = () => {
    setIsAddMode(true);
    setRowToEdit(null);
    setEditVisible(true);
  };

  const showDeleteDialog = (rowData) => {
    setRowToDelete(rowData);
    setVisible(true);
  };

  const deleteRow = async () => {
    try {
      const data = await apiService(EntityApiRoutes.DELETE_PERSONNEL, 'DELETE', {
        replace: { id: rowToDelete.id },
      });

      if (data.status) {
        dispatch(fetchPersonnel());
        setMessage("Your new contact has been deleted.");
      } else {
        setMessage(data.message || "Failed to delete contact.");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      setMessage("An error occurred while deleting contact.");
    }
    setVisible(false);
  };

  return {
    data,
    visible,
    setVisible,
    editVisible,
    setEditVisible,
    isAddMode,
    rowToEdit,
    setRowToEdit,
    rowToDelete,
    setRowToDelete,
    message,
    setMessage,
    successMessage,
    setSuccessMessage,
    first,
    rows,
    onPageChange,
    showEditDialog,
    showAddDialog,
    showDeleteDialog,
    deleteRow,
    searchDataArr,
    setSearchDataArr,
    searchTerm,
    setSearchTerm,
    loading,
    setLoading,
    editMessage,
    setEditMessage,
    department,
    setDepartment,
    selectedDepartment,
    setSelectedDepartment,
    location,
    setLocation,
    selectedLocation,
    setSelectedLocation,
  };
};

export default usePersonnelTable;
