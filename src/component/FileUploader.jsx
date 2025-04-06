
// File: src/components/FileUploader.jsx
/**
 * FileUploader component - handles file upload UI
 */
import React from 'react';

function FileUploader({ onFileUpload, showAllColumns, onToggleShowAllColumns }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
      <div className="upload-controls">
        <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
        />
        <label>
          <input
              type="checkbox"
              checked={showAllColumns}
              onChange={(e) => onToggleShowAllColumns(e.target.checked)}
          />
          Show all columns
        </label>
      </div>
  );
}

export default FileUploader;