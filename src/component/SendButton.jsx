import React from 'react'

import '../pages/SuccessPage.css'

function SendButton({ onClick }) {
  return (
      <button className="send-button" onClick={onClick}>
        Send order tracking to all selected users
      </button>
  )
}

export default SendButton
