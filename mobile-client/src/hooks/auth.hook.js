import { useCallback, useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';

const storage = 'userStorage';

export const useAuth = () => {
  const [token, setToken] = useState('');

  const login = useCallback(async (jwt) => {
    setToken(jwt);

    await AsyncStorage.setItem(
      storage,
      JSON.stringify({
        token: jwt,
      })
    );
  }, []);

  const logout = useCallback(async () => {
    setToken('');

    await AsyncStorage.removeItem(storage);
  }, []);

  // Логин пользователя, если в localStorage уже есть нужные данные
  useEffect(() => {
    async function checkToken() {
      const data = JSON.parse(await AsyncStorage.getItem(storage));

      if (data && data.token) {
        login(data.token);
      }
    }
    checkToken();
  }, [login]);

  return { login, logout, token };
};
