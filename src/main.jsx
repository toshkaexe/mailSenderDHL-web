import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  const [password, setPassword] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === '1234') {
      setIsCorrect(true)
    } else {
      alert('Неверный пароль')
    }
  }

  if (isCorrect) {
    return <h1>Ок ✅</h1>
  }

  return (
      <form onSubmit={handleSubmit} style={{ padding: '40px', fontFamily: 'sans-serif' }}>
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

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
)