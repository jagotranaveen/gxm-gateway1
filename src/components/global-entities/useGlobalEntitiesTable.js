import { useState } from "react";
import { downloadCSV } from "../../utils/CSVFunctions";

const useGlobalEntitiesTable = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [filterToggle,] = useState(false);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };


  const handleDownloadCSV = (entities) => {
    if (entities.length === 0) {
      console.warn('No data to download');
      return;
    }
    downloadCSV(entities, 'global_entities.csv');
  };

  return {
    first,
    rows,
    onPageChange,
    selectedFilter,
    setSelectedFilter,
    filterToggle,
    handleDownloadCSV
  };
};

export default useGlobalEntitiesTable;
