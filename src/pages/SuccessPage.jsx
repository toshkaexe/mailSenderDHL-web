// File: src/pages/SuccessPage.jsx
/**
 * SuccessPage component - main page after authentication
 */
import React, { useState } from 'react';
import './SuccessPage.css';
import FileUploader from "../component/FileUploader";
import DataTable from "../component/DataTable";
import SendButton from "../component/SendButton";
import {MessageService} from "../service/message";
import {ApiService} from "../service/api";
import {useCSVData} from "../hook/useCSVData";


function SuccessPage() {
  const {
    data,
    headers,
    selectedRows,
    showAllColumns,
    isLoading: csvLoading,
    error: csvError,
    processFile,
    toggleRow,
    toggleShowAllColumns,
    getSelectedData
  } = useCSVData();

  const [sendStatus, setSendStatus] = useState({
    sending: false,
    success: null,
    error: null
  });

  const handleSend = async (selectedData) => {
    if (!selectedData.length) return;

    setSendStatus({
      sending: true,
      success: null,
      error: null
    });

    try {
      const messages = MessageService.prepareMessages(selectedData);
      const results = [];

      for (const message of messages) {
        console.log('📤 Sending email to:', message.email);
        const result = await ApiService.sendEmail(message);
        results.push(result);

        if (!result.success) {
          throw new Error(`Failed to send email to ${message.email}: ${result.error}`);
        }
      }

      setSendStatus({
        sending: false,
        success: `Successfully sent ${results.length} emails`,
        error: null
      });

      alert(`📬 Messages sent: ${results.length} users`);
    } catch (error) {
      console.error('Send error:', error);
      setSendStatus({
        sending: false,
        success: null,
        error: error.message
      });

      alert(`Error sending emails: ${error.message}`);
    }
  };

  return (
      <div className="success-page">
        <h1>Access granted ✅</h1>
        <p>Welcome to the protected page!</p>

        <FileUploader
            onFileUpload={processFile}
            showAllColumns={showAllColumns}
            onToggleShowAllColumns={toggleShowAllColumns}
        />

        {csvError && <div className="error-message">{csvError}</div>}
        {csvLoading && <div className="loading">Loading CSV data...</div>}

        {data.length > 0 && (
            <>
              <DataTable
                  headers={headers}
                  data={data}
                  selectedRows={selectedRows}
                  onToggleRow={toggleRow}
              />

              <SendButton
                  selectedData={getSelectedData()}
                  onClick={handleSend}
                  isLoading={sendStatus.sending}
              />

              {sendStatus.success && (
                  <div className="success-message">{sendStatus.success}</div>
              )}

              {sendStatus.error && (
                  <div className="error-message">{sendStatus.error}</div>
              )}
            </>
        )}
      </div>
  );
}

export default SuccessPage;