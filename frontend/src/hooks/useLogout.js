import { useAuthContext } from './useAuthContext';

const useLogout = () => {
  const { logout } = useAuthContext();

  const logoutUser = () => {
    logout();
  };

  return { logoutUser };
};

export default useLogout;
