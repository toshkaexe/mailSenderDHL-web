import React, { useState } from 'react'
import * as Papa from 'papaparse'
import './SuccessPage.css'
import DataTable from '../component/DataTable'
import SendButton from './SendButton'
import { prepareMessages } from '../service/messageService'

const allowedColumns = [
  'SITEMS_IDENTCODE',
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
      delimiter: ';',
      complete: (results) => {
        const parsedData = results.data
        const allKeys = Object.keys(parsedData[0] || {})

        console.log('📄 CSV загружен:', parsedData)

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
      },
      error: (err) => {
        console.error('❌ Ошибка при загрузке CSV:', err)
      }
    })
  }

  const toggleRow = (index) => {
    setSelectedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const handleSend = async (rawData) => {
    const prepared = prepareMessages(rawData)

    console.log('📦 Подготовленные сообщения к отправке:')
    console.table(prepared.map(msg => ({
      email: msg.email,
      subject: msg.subject,
      message: msg.message.slice(0, 100) + '...'
    })))

    for (const message of prepared) {
      console.log('📤 Отправка письма:')
      console.log(`   📨 Email:    ${message.email}`)
      console.log(`   📝 Subject:  ${message.subject}`)
      console.log('   🧾 Полное сообщение:')
      console.log(message.message)
      console.log('---------------------------------------------------')

      try {
        const payload = {
          email: message.email,
          subject: message.subject,
          message: message.message
        }

        console.log('📦 Payload JSON:', JSON.stringify(payload, null, 2))

        const response = await fetch('http://localhost:3000/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })

        if (!response.ok) {
          throw new Error(await response.text())
        }

        const result = await response.json()
        console.log(`✅ Успешно отправлено на ${message.email}`, result)
      } catch (err) {
        console.error(`❌ Ошибка при отправке на ${message.email}:`, err.message)
      }
    }

    alert(`📬 Сообщения отправлены: ${prepared.length} пользователей`)
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
            <>
              <DataTable
                  headers={headers}
                  data={data}
                  selectedRows={selectedRows}
                  onToggleRow={toggleRow}
                  onSend={handleSend}
              />
              <SendButton
                  selectedData={data}
                  onClick={handleSend}
              />
            </>
        )}
      </div>
  )
}

export default SuccessPage
