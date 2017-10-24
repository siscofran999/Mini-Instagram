import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  TextInput,
  Alert,
  AsyncStorage
} from 'react-native';
import { Button, Text } from 'native-base';
import {Actions} from 'react-native-router-flux'
import axios from 'axios';

export default class App extends Component {

  state = {
    id: '',
    pass: ''
  }

  handleId = (text) => {
    this.setState({ id: text })
  }

  handlePass = (text) => {
    this.setState({ pass: text })
  }
  
  regist(){
    Actions.Register();
  }

  submit(id,pass){
    if(id == null && pass == null){
      Alert.alert('Maaf, semua kolom belum diisi')
    }else if(id == null || pass == null){
      Alert.alert('Maaf, harap mengisi semua kolom')
    }else{
      axios({
        method: 'post',
        url: 'http://192.168.12.54/TA/login.php',
        data: {
          id: id,
          pass: pass
        }
      }).then((data) => {
        console.log(data)
        if(data.data.Yes){
          var nama = data.data.Yes.nama
          var api = data.data.Yes.api
          var id = data.data.Yes.id
          var pass = data.data.Yes.pass
          var email = data.data.Yes.email
          AsyncStorage.setItem('nama', JSON.stringify(nama));
          AsyncStorage.setItem('id', JSON.stringify(id));
          AsyncStorage.setItem('pass', JSON.stringify(pass));
          AsyncStorage.setItem('email', JSON.stringify(email));
          AsyncStorage.setItem('api', JSON.stringify(api));
          Actions.tabbar();
        }else{
          Alert.alert('Maaf, ID / PASS anda salah')
          this._kosong1.setNativeProps({text: ''});
          this._kosong2.setNativeProps({text: ''});
        }
      })
    }
  }

  render() {
    return (
      <Image source={require('../assets/BLBG.jpg')} style={styles.backgroundImage}>  
      <View style={styles.container} >
        <View style={styles.formContainer}>
          <TextInput 
            ref={component => this._kosong1 = component}
            placeholder='ID'
            style={styles.input}
            onChangeText= {this.handleId}
          />

          <TextInput 
            ref={component => this._kosong2 = component}
            placeholder='Password'
            secureTextEntry
            style={styles.input}
            onChangeText={this.handlePass}
          />

          <Button block success onPress={() => {this.submit(this.state.id,this.state.pass)}}>
            <Text>Login</Text>
          </Button>
          {/* <Text>Lupa Password ??</Text> */}
          <View style={styles.akun}>
          <Text onPress={() => {this.regist()}}>Belum buat akun ?? Buat disini</Text>
          </View>

        </View>
      </View>
    </Image>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },

  container:{
    flex: 1,
    justifyContent: 'center'
  },

  logo:{
    width: 150,
    height: 150
  },

  formContainer:{
    padding: 20,
  },

  input:{
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginBottom: 10,
    paddingHorizontal: 10
  },

  akun:{
    marginTop: 10,
    alignItems: 'center',
  },

});