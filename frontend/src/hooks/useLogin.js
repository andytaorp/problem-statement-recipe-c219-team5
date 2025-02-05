import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
 
export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()
 
  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
 
    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
 
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Login failed, please try again later.')
      }
 
      const json = await response.json()
 
      localStorage.setItem('user', JSON.stringify(json))
 
      dispatch({ type: 'LOGIN', payload: json })
 
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      setError(err.message)
    }
  }
 
  return { login, isLoading, error }
}