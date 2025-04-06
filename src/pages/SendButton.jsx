// pages/SendButton.js
import React from 'react'
import './SendButton.css'

function SendButton({ selectedData, onClick }) {
  const handleClick = () => {
    console.log('📤 Button clicked. Raw data:', selectedData)
    if (onClick) onClick(selectedData)
  }

  return (
      <button className="send-button" onClick={handleClick}>
        Send order tracking to all users ({selectedData.length})
      </button>
  )
}

export default SendButton
