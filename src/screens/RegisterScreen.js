import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
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
import { nameValidator } from '../helpers/nameValidator'
import {DefineServer} from '../helpers/ServerIP'


const  RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: '', error: '' })
  const [number, setNumber] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const FindUsedNumber = async () => {
      let req = await fetch(
        DefineServer()+'/verify/'+number.value
      );
      let res= await req.json();
      return res
    };
  
  const onSignUpPressed = async() => {

    const nameError = nameValidator(name.value)
    const numberError = numberValidator(number.value)
    const passwordError = passwordValidator(password.value)
    if (numberError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setNumber({ ...number, error: numberError })
      setPassword({ ...password, error: passwordError })
      return
    }
    if (await FindUsedNumber() === true){
      setNumber({ ...number, error: 'Ce numero est deja utilisé' });
    } else {
      console.log("OK")
      let user = {phone: number.value, password: password.value, nom: name.value, lat:"", lng:"", lastsync: new Date().toLocaleString().toString(), isinjob: false  };
      fetch(DefineServer()+'/register', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body:JSON.stringify(user),
          })
          .then(res => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            })
          })
    }
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Créer votre compte</Header>
      <TextInput
        label="Nom"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
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
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Inscription
      </Button>
      <View style={styles.row}>
        <Text>Vous avez deja un compte ? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Connexion</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})

export default RegisterScreen
