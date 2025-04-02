import React, { useState } from 'react'
import * as Papa from 'papaparse'
import './SuccessPage.css'
import DataTable from '../component/DataTable'

const allowedColumns = [
  'TEILNAHME',
  'AbsHausNr', 'AbsName1', 'AbsName2', 'ORT', 'AbsPlz', 'AbsStrasse', 'SITEMS_DATE',
  'EmpName1', 'EmpName2', 'EmpLandName', 'EmpPlz', 'SITEMS_PRODUKTCODE',
  'EmpOrt', 'EmpStrasse', 'EmpHausNr', 'EmpLandCode',
  'SITEMS_E_EMAIL'
]

function SuccessPage() {
  const [data, setData] = useState([])
  const [headers, setHeaders] = useState([])
  const [selectedRows, setSelectedRows] = useState({})
  const [showAllColumns, setShowAllColumns] = useState(false)

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data
        const allKeys = Object.keys(parsedData[0] || {})

        const filteredData = showAllColumns
            ? parsedData
            : parsedData.map((row) => {
              const filteredRow = {}
              allowedColumns.forEach((key) => {
                filteredRow[key] = row[key] || ''
              })
              return filteredRow
            })

        setHeaders(showAllColumns ? allKeys : allowedColumns)
        setData(filteredData)
        setSelectedRows({})
      }
    })
  }

  const toggleRow = (index) => {
    setSelectedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const handleSend = (selectedData) => {
    console.log('🚀 Sending selected data:', selectedData)
    alert(`Tracking info sent to ${selectedData.length} users!`)
  }

  return (
      <div className="success-page">
        <h1>Access granted ✅</h1>
        <p>Welcome to the protected page!</p>

        <div className="upload-controls">
          <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
          />
          <label>
            <input
                type="checkbox"
                checked={showAllColumns}
                onChange={(e) => setShowAllColumns(e.target.checked)}
            />
            Show all columns
          </label>
        </div>

        {data.length > 0 && (
            <DataTable
                headers={headers}
                data={data}
                selectedRows={selectedRows}
                onToggleRow={toggleRow}
                onSend={handleSend}
            />
        )}
      </div>
  )
}

export default SuccessPage
