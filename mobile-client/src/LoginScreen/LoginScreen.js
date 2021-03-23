import React, { useContext, useState } from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useHttp } from '../hooks/http.hook';
import { HOST_WITH_PORT } from '../../constants';
import { MainContext } from '../../App';

const { width } = Dimensions.get('screen');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { request, loading } = useHttp();
  const { login } = useContext(MainContext);

  const handleLogin = async () => {
    try {
      const data = await request(`${HOST_WITH_PORT}/api/auth/login`, 'post', {
        email,
        password: pass,
      });
      if (data.message) return;

      login(data.token);
    } catch (e) {}
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.mainContainer}>
        <KeyboardAvoidingView behavior='padding'>
          <View>
            <View>
              <Text>Logo</Text>
            </View>
            <View>
              <TextInput
                style={styles.inputStyle}
                keyboardType='email-address'
                placeholderTextColor='#fff'
                autoCapitalize='none'
                autoCompleteType='off'
                autoCorrect={false}
                placeholder='Email'
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View>
              <TextInput
                placeholder='Пароль'
                style={styles.inputStyle}
                placeholderTextColor='#fff'
                autoCapitalize='none'
                autoCompleteType='off'
                secureTextEntry={true}
                autoCorrect={false}
                value={pass}
                onChangeText={(text) => setPass(text)}
              />
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Войти</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#10a0ff',
  },
  inputStyle: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    marginVertical: 20,
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: 5,
    paddingVertical: 5,
    width: width / 1.5,
  },
  buttonContainer: {
    width: width / 1.5,
    height: 40,
    marginTop: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
