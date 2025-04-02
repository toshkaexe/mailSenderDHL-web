import React from 'react'

import './SendButton.css'

function SendButton({ selectedData, onClick }) {
  const handleClick = () => {
    console.log('🚀 Sending selected data:', selectedData)
    onClick && onClick(selectedData)
  }

  return (
      <button className="send-button" onClick={handleClick}>
        Send order tracking to all selected users
      </button>
  )
}

export default SendButton
