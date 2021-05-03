import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

clearInterval() ; 


const StartScreen = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>MyApp</Header>
    <Paragraph>
      La traçabilité pour tous, partout.
    </Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Connexion
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('RegisterScreen')}
    >
      Inscription
    </Button>
  </Background>
)

export default StartScreen
