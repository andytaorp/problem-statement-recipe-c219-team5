// useLogin.js
import { useAuthContext } from './useAuthContext';
import axios from 'axios';

const useLogin = () => {
  const { login } = useAuthContext();

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      login(response.data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return { loginUser };
};

export default useLogin;
