import { useCallback, useEffect, useState } from 'react';

const storage = 'userStorage';

export const useAuth = () => {
  const [token, setToken] = useState('');

  const login = useCallback(async (jwt) => {
    setToken(jwt);

    localStorage.setItem(
      storage,
      JSON.stringify({
        token: jwt,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken('');

    localStorage.removeItem(storage);
  }, []);

  // Логин пользователя, если в localStorage уже есть нужные данные
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storage));

    if (data && data.token) {
      login(data.token);
    }
  }, [login]);

  return { login, logout, token };
};
