// File: src/services/csv.js
/**
 * CSV Service - handles CSV parsing and data transformation
 */
import Papa from 'papaparse';

// Define column mapping for different CSV formats
const COLUMN_MAPPINGS = {
  // This maps the desired columns to the actual CSV column names
  'Sendungsnummer': ['Sendungsnummer'],
  'Empfänger Name 1': ['Empfänger Name 1'],
  'Empfänger E-Mail-Adresse': ['Empfänger E-Mail-Adresse']
};

export const CsvService = {
  parseCSV: (file, options = {}) => {
    return new Promise((resolve, reject) => {
      const defaultOptions = {
        header: true,
        skipEmptyLines: true,
        delimiter: ';',
        encoding: 'CP1252', // This is important for German CSV files
        complete: (results) => resolve(results),
        error: (err) => reject(err)
      };

      Papa.parse(file, { ...defaultOptions, ...options });
    });
  },

  filterColumns: (data, allowedColumns, showAllColumns) => {
    if (showAllColumns) return data;

    return data.map((row) => {
      const filteredRow = {};

      allowedColumns.forEach((desiredColumn) => {
        // Try to find the column in the CSV using the mapping
        const possibleSourceColumns = COLUMN_MAPPINGS[desiredColumn] || [desiredColumn];

        // Find the first column that exists in the row
        const sourceColumn = possibleSourceColumns.find(col => col in row);

        // If found, copy the value
        if (sourceColumn) {
          filteredRow[desiredColumn] = row[sourceColumn] || '';
        } else {
          filteredRow[desiredColumn] = '';
        }
      });

      return filteredRow;
    });
  }
};