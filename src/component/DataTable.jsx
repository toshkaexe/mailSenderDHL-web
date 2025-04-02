import React from 'react'
import SendButton from "./SendButton";


function DataTable({ headers, data, selectedRows, onToggleRow, onSend }) {
  return (
      <div className="table-wrapper">
        <table>
          <thead>
          <tr>
            <th></th>
            {headers.map((header, i) => (
                <th key={i}>{header}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {data.map((row, rowIndex) => (
              <tr
                  key={rowIndex}
                  className={selectedRows[rowIndex] ? 'selected-row' : ''}
              >
                <td className="checkbox-cell">
                  <input
                      type="checkbox"
                      checked={!!selectedRows[rowIndex]}
                      onChange={() => onToggleRow(rowIndex)}
                  />
                </td>
                {headers.map((header, colIndex) => (
                    <td key={colIndex}>{row[header]}</td>
                ))}
              </tr>
          ))}
          </tbody>
        </table>

        <SendButton onClick={onSend} />
      </div>
  )
}

export default DataTable
