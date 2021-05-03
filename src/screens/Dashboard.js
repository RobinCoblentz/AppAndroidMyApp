import React, {setState, useState} from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import {DefineServer} from '../helpers/ServerIP'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = ({ navigation }) => {
 
  const [user, setUser] = useState({ phone: "" , lat: '', lng:'', isonjob:false,  lastsync: "", isinjob:false}) //    new Date().toLocaleString()
  var interval = setInterval(Update, 30000)
  var parsedpositionlat
  var parsedpositionlng

//fonction 
  async function StopJob(){
    let number = await AsyncStorage.getItem('usernumber')
    number = {phone : number}
    let req = await fetch(DefineServer()+'/stop', {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(number)
  })
  let res = await req

  }


  async function DeleteSession () {
  StopJob()
  clearInterval(interval)
  await AsyncStorage.removeItem('user')
  }

  ////////////////////////////////////////////
  async function Update() 
  {
    user.phone = await AsyncStorage.getItem('usernumber')
    if (setUser.isinjob === true)
    {
      await findCoordinates () 
      if (parsedpositionlat !== undefined && parsedpositionlng !== undefined )
      {
        user.isinjob = true
        user.lastsync = await new Date().toLocaleString().toString() 
        user.lat = parsedpositionlat
        user.lng = parsedpositionlng
        let req = await fetch(DefineServer()+'/gps', {
          method: 'PUT',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(user) 
      })
      let res = await req
      }
     
    } 
    else 
    {
      StopJob()
    }
  }


  async function findCoordinates () {
		navigator.geolocation.getCurrentPosition(
			position => {
        parsedpositionlat = position.coords.latitude.toString()
        parsedpositionlng = position.coords.longitude.toString()
      		},
			error => console.log(error),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	};

return (
  <Background>
    <Logo />
    <Header>C'est partit ! </Header>
    <Paragraph>
      Commencez ou terminez simplement votre journée !
    </Paragraph>



    <Button
      mode="outlined"
      onPress={() => {
        setUser.isinjob = true
        alert('Vous entrez en phase de travail');
        
      }}
      title="Press Me"
    >
     Commencez job 
    </Button>

    <Button
      mode="outlined"
      onPress={() => {
        setUser.isinjob = false
        StopJob()
        alert('Vous terminez votre phase de travail');
        
      }}
    >
     Terminez job 
    </Button>
    

    <Button
      mode="contained"
      onPress={() => 
      {DeleteSession()
        navigation.reset({
          index: 0,
          routes: [{ name: 'StartScreen' }],
        })}
      }
    >
      Logout
    </Button>
  </Background>
)}

export default Dashboard
    