import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Image,
  StyleSheet,
  Animated,
  Easing,
  Alert,
  AsyncStorage,
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import axios from 'axios';

export default class Loading extends Component {

  constructor(){
    super()
    this.spinValue = new Animated.Value(0)
    setTimeout(() => {
      this.cek()
    }, 2000);
  }

  cek = async () => {
    var api = await AsyncStorage.getItem('api');
    var id = await AsyncStorage.getItem('id');
    var nama = await AsyncStorage.getItem('nama');
    if(api && id && nama){
      var api = api.replace(/\"/g, "");
      axios({
        url:'http://192.168.12.54/TA/cek_loading.php',
        method:'GET'
      }).then((data)=>{
        var apii = data.data.hayo_tebak.apa_ini
        if(api == apii){
          Actions.tabbar();
        }else{
          Actions.Login();
        }
      })
    }else{
      Actions.Login();
    }
  }
  
  componentWillMount(){
    this.spin()
  }

  spin(){
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,{
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
      }
    ).start(() => this.spin());
  }
  
  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    return (
      <View style={styles.container}>
        <Animated.Image 
        style={{
          width: 100,
          height: 100,
          transform: [{rotate: spin}]
        }}
        source={require('../assets/load.png')}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

AppRegistry.registerComponent('Loading', () => Loading);
