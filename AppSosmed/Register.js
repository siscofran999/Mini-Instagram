import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  TextInput,
  Alert,
  AsyncStorage,
} from 'react-native';
import { Button, Text } from 'native-base';
import axios from 'axios';
import {Actions} from 'react-native-router-flux'

export default class Register extends Component {

    state = {
        Id: '',
        Nama: '',
        Email: '',
        Pass: '',
        konfPass: '',
        Disable: true,
        ip : '192.168.0.12'
    }

    handleID = (text) => {
        this.setState({ Id: text })
    }

    handleNama = (text) => {
        this.setState({ Nama: text })
    }

    handleEmail = (text) => {
        var atpos = text.indexOf("@");
        var dotpos = text.lastIndexOf(".");
        if (atpos<1 || dotpos<atpos+2 || dotpos+2>=text.length) {
            this.setState({ Disable: true})
        }else{
            this.setState({ Email: text })
            this.setState({ Disable: false})
        }
    }

    handlePass = (text) => {
        this.setState({ Pass: text})
    }

    handleKonfPass = (text) => {
        this.setState({ konfPass: text })
    }

    submit(id,nama,email,pass, konfpass){
        if(id == null && nama == null && email == null && pass == null && konfpass == null){
            Alert.alert('Maaf, semua kolom belum diisi')
        }else if(id == null || nama == null || email == null || pass == null || konfpass == null){
            Alert.alert('Maaf, harap Mengisi semua kolom')
        }else if(id && nama && email && pass && konfpass){
            if(pass != konfpass){
                Alert.alert('Maaf, password anda tidak sama')
            }else{
                axios({
                    url: 'http://'+this.state.ip+'/TA/register.php?id='+id+'&nama='+nama+'&email='+email+
                    '&pass='+pass+'&konfpass='+konfpass,
                    method: 'GET'
                }).then((data) => {
                    var api = data.data.Yes
                    var ada = data.data.Maaf
                    if(api){
                        AsyncStorage.setItem('id', JSON.stringify(id));
                        AsyncStorage.setItem('nama', JSON.stringify(nama));
                        AsyncStorage.setItem('email', JSON.stringify(email));
                        AsyncStorage.setItem('pass', JSON.stringify(pass));
                        AsyncStorage.setItem('api', JSON.stringify(api));
                        Actions.tabbar();
                    }else if(ada){
                        Alert.alert('Maaf, ID sudah pernah digunakan')
                        this._kosong1.setNativeProps({text: ''});
                        this._kosong2.setNativeProps({text: ''});
                        this._kosong3.setNativeProps({text: ''});
                        this._kosong4.setNativeProps({text: ''});
                        this._kosong5.setNativeProps({text: ''});
                    }else{
                        Alert.alert('Maaf, ada kesalahan dengan sistem')
                        Actions.Login();
                    }
                }).catch(function (error) {
                    Alert.alert('Maaf, harap periksa koneksi internet anda')
                });
            }
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
            onChangeText= {this.handleID}
          />

          <TextInput
          ref={component => this._kosong2 = component} 
            placeholder='Nama'
            style={styles.input}
            onChangeText={this.handleNama}
          />

          <TextInput 
            ref={component => this._kosong3 = component}
            placeholder='Email'
            keyboardType='email-address'
            style={styles.input}
            onChangeText={this.handleEmail}
          />

          <TextInput 
            ref={component => this._kosong4 = component}
            placeholder='Password'
            secureTextEntry
            style={styles.input}
            onChangeText={this.handlePass}
          />

          <TextInput
            ref={component => this._kosong5 = component} 
            placeholder='Konf Password'
            secureTextEntry
            style={styles.input}
            onChangeText={this.handleKonfPass}
          />

          <Button block success 
          onPress={() => {this.submit(this.state.Id,this.state.Nama,this.state.Email ,this.state.Pass, this.state.konfPass)}} disabled= {this.state.Disable}>
            <Text>Register</Text>
          </Button>

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

});