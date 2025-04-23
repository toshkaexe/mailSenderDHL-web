// File: src/components/DataTable.jsx
/**
 * DataTable component - presents data in tabular format
 */
import React from 'react';

function DataTable({ headers, data, selectedRows, onToggleRow }) {
  if (!data.length) return null;

  return (
      <div className="table-wrapper">
        <table>
          <thead>
          <tr>
            <th>#</th> {/* Номер строки */}
            <th></th> {/* Чекбокс */}
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
                <td>{rowIndex + 1}</td> {/* Нумерация строк */}
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
      </div>
  );
}

export default DataTable;
