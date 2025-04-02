import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === '1234') {
      navigate('/success')
    } else {
      alert('Incorrect password')
    }
  }

  return (
      <form onSubmit={handleSubmit} style={{ padding: '40px' }}>
        <h2>Enter password</h2>
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ padding: '8px', fontSize: '16px' }}
        />
        <button type="submit" style={{ marginLeft: '10px', padding: '8px 16px' }}>
          Submit
        </button>
      </form>
  )
}

export default LoginPage
