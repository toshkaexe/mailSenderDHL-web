// File: src/hooks/useCSVData.js
/**
 * Custom hook for CSV data handling
 */
import { useState } from 'react';
import { CsvService } from "../service/csv";

// Define the allowed columns directly in this hook
export const ALLOWED_COLUMNS = [
  'Sendungsnummer',
  'Empfänger Name 1',
  'Empfänger E-Mail-Adresse'
];

export function useCSVData() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [selectedRows, setSelectedRows] = useState({});
  const [showAllColumns, setShowAllColumns] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (file) => {
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await CsvService.parseCSV(file);
      const parsedData = result.data;
      const allKeys = Object.keys(parsedData[0] || {});

      const filteredData = CsvService.filterColumns(
          parsedData,
          ALLOWED_COLUMNS,
          showAllColumns
      );

      setHeaders(showAllColumns ? allKeys : ALLOWED_COLUMNS);
      setData(filteredData);
      setSelectedRows({});
    } catch (err) {
      console.error('Error parsing CSV:', err);
      setError('Failed to parse CSV file');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRow = (index) => {
    setSelectedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleShowAllColumns = (value) => {
    setShowAllColumns(value);
    if (data.length > 0) {
      handleFileUpload(lastFileRef.current);
    }
  };

  // Keep track of the last file for reprocessing when options change
  const lastFileRef = { current: null };

  const processFile = (file) => {
    lastFileRef.current = file;
    handleFileUpload(file);
  };

  const getSelectedData = () => {
    return data.filter((_, index) => selectedRows[index]);
  };

  return {
    data,
    headers,
    selectedRows,
    showAllColumns,
    isLoading,
    error,
    processFile,
    toggleRow,
    toggleShowAllColumns,
    getSelectedData
  };
}