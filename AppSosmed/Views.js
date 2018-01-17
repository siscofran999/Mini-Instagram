import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Alert,
  AsyncStorage,
  ScrollView,
  TextInput,
  Keyboard
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Header, Left, Body, Right,Text ,Button ,Title} from 'native-base';
import {Actions} from 'react-native-router-flux'
import ImagePickerCrop from 'react-native-image-crop-picker';
import axios from 'axios';

export default class Views extends Component {

    constructor(){
        super()
        this.state = {
            image: null,
        }
        this.muncul_foto()
    }

    muncul_foto = async () => {
        var foto = await AsyncStorage.getItem('testing');
        var foto = foto.replace(/\"/g, "");
        this.setState({image: {uri: "file://"+foto}});
    }

    renderAsset(image) {
        if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
            Alert.alert('Maaf hanya untuk foto saja')
        }
        return this.renderImage(image);
    }

    renderImage(image) {
        return <Image style={{position: 'absolute',top: 0,left: 0,bottom: 0,right: 0, resizeMode: 'contain'}} source={image} />
    }

    render() {
        return (
            <View style={{flex:1}}>
                    {this.state.image ? this.renderAsset(this.state.image) : null}
            </View>
        )
    }
}