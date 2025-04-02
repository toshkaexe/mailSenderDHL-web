import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function WelcomePage() {
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === '1234') {
      navigate('/success')
    } else {
      alert('Неверный пароль')
    }
  }

  return (
      <form onSubmit={handleSubmit} style={{ padding: '40px' }}>
        <h2>Введите пароль</h2>
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            style={{ padding: '8px', fontSize: '16px' }}
        />
        <button type="submit" style={{ marginLeft: '10px', padding: '8px 16px' }}>
          Войти
        </button>
      </form>
  )
}

export default WelcomePage
