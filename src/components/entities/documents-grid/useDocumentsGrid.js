import { useEffect, useState } from "react";
import useDebounce from "../key-personnel/useDebounce";
import {
  uploadDocuments,
  setDataDocument,
  fetchDocuments,
} from "./documentsGridSlice";
import { useDispatch, useSelector } from "react-redux";

const useDocumentsGrid = (documents) => {
  const dispatch = useDispatch();
  const uploadstatus = useSelector((state) => state.documentsGrid.uploadstatus);
  const uploadSuccessMsg = useSelector(
    (state) => state.documentsGrid.uploadSuccessMsg
  );

  const Documents = documents || [];
  const [tableData, setTableData] = useState([]);
  const [documentModal, setDocumentModal] = useState(false);
  const [searchDataArr, setSearchDataArr] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState([]);
  const [uploadedBy, setUploadedBy] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedUploadedBy, setSelectedUploadedBy] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [documentfile, setDocumentFile] = useState("");

  useEffect(() => {
    setTableData(Array.isArray(Documents) ? Documents : []);
  }, [documents]);

  const filterData = (
    tableData,
    searchTerm,
    selectedType,
    selectedUploadedBy
  ) => {
    let filteredData = tableData;

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

    if (selectedType && selectedType.length > 0) {
      filteredData = filteredData.filter((item) =>
        selectedType.includes(item.type)
      );
    }

    if (selectedUploadedBy) {
      filteredData = filteredData.filter(
        (item) => item?.createdBy.name === selectedUploadedBy
      );
    }

    if (fromDate && toDate) {
      filteredData = filteredData.filter((item) => {
        const itemDate = new Date(item.createdAt);
        return itemDate >= fromDate && itemDate <= toDate;
      });
    }

    return filteredData;
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  useEffect(() => {
    if (tableData) {
      setSearchDataArr(
        filterData(
          tableData,
          debouncedSearchTerm,
          selectedType,
          selectedUploadedBy,
          fromDate,
          toDate
        )
      );
    }
  }, [
    debouncedSearchTerm,
    selectedType,
    selectedUploadedBy,
    fromDate,
    toDate,
    tableData,
  ]);

  useEffect(() => {
    if (tableData) {
      const types = [...new Set(tableData.map((documents) => documents.type))];
      setType(types);
    }
  }, [tableData]);

  useEffect(() => {
    if (tableData) {
      const uploadedsBy = [
        ...new Set(tableData.map((documents) => documents?.createdBy.name)),
      ];
      setUploadedBy(uploadedsBy);
    }
  }, [tableData]);

  const handleUploadDocument = (data) => {
    dispatch(uploadDocuments(data));
  };

  const handleCloseDocumentModal = () => {
    setDocumentFile("");
    setDocumentModal(false);
    dispatch(fetchDocuments());
    dispatch(setDataDocument({ key: "uploadstatus", value: "" }));
  };
  useEffect(() => {
    if (uploadstatus == "success") {
      handleCloseDocumentModal();
    }
  }, [uploadstatus]);

  return {
    tableData,
    setTableData,
    searchDataArr,
    setSearchDataArr,
    searchTerm,
    setSearchTerm,
    type,
    uploadedBy,
    selectedType,
    setSelectedType,
    selectedUploadedBy,
    setSelectedUploadedBy,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    documentModal,
    setDocumentModal,
    handleCloseDocumentModal,
    handleUploadDocument,
    setDocumentFile,
    documentfile,
    uploadstatus,
    uploadSuccessMsg,
  };
};

export default useDocumentsGrid;
