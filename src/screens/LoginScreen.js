import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { numberValidator } from '../helpers/numberValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import {DefineServer} from '../helpers/ServerIP'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cos } from 'react-native-reanimated'

const LoginScreen = ({ navigation }) => {
    const [number, setNumber] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
   
    const VerifyCredentials = async () => {
      let user = {phone : number.value , pass : password.value }

      console.log(DefineServer())
      
      let req = await fetch(DefineServer()+'/login', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body:JSON.stringify(user),
      })
      let res = await req.json()
      if (res === true)
      {
       await AsyncStorage.setItem('usernumber', number.value)
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        })
      }
      else 
      {
        setPassword({ ...password, error: 'Numero/Mot de passe incorrect' });
        setNumber({ ...number, error: 'Numero/Mot de passe incorrect' });
      }
    }
  
    const onLoginPressed = async () => {
      const numberError = numberValidator(number.value)
      const passwordError = passwordValidator(password.value)
      if (numberError || passwordError) {
        setNumber({ ...number, error: numberError })
        setPassword({ ...password, error: passwordError })
        return
      }
      if (await VerifyCredentials() === false){
        setNumber({ ...number, error: 'Vos identifiants ne correspondent pas ou sont inconnus.' });
          navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
          })
      }
      
    }
    

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Content de vous revoir !</Header>
      <TextInput
        label="Numero"
        returnKeyType="next"
        value={number.value}
        onChangeText={(text) => setNumber({ value: text, error: '' })}
        error={!!number.error}
        errorText={number.error}
        autoCapitalize="none"
        autoCompleteType="tel"
        textContentType="telephoneNumber"
        keyboardType="phone-pad"
      />
      <TextInput
        label="Mot de passe"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text ) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.forgot}>Mot de passe oublié?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Connexion
      </Button>
      <View style={styles.row}>
        <Text>Pas de compte ? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Inscrivez-vous!</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})

export default LoginScreen
