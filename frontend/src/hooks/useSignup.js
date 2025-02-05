import { useAuthContext } from './useAuthContext';
import axios from 'axios';

const useSignup = () => {
  const { login } = useAuthContext();

  const signupUser = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/signup', { email, password });
      login(response.data);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return { signupUser };
};

export default useSignup;
