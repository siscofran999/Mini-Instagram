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
  Keyboard,
  Modal,
  Dimensions
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Header, Left, Body, Right,Text ,Button ,Title} from 'native-base';
import {Actions} from 'react-native-router-flux'
import ImagePickerCrop from 'react-native-image-crop-picker';
import axios from 'axios';
var lz77 = require('./lz77');
var base64 = require('base-64');
var RNFS = require('react-native-fs');
import * as Progress from 'react-native-progress';

export default class TulisCaption extends Component {

    constructor(){
        super()
        this.state = {
            image: null,
            images: null,
            caption: '',
            progress: 0,
        }
        this.muncul_foto()
    }

    muncul_foto = async () => {
        var foto = await AsyncStorage.getItem('image');
        var foto = foto.replace(/\"/g, "");
        this.setState({image: {uri: foto}});
    }

    renderAsset(image) {
        if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
            Alert.alert('Maaf hanya untuk foto saja')
        }
        return this.renderImage(image);
    }

    renderImage(image) {
        return <Image style={{width: 300, height: 300, resizeMode: 'contain', borderRadius: 30}} source={image} />
    }

    handleCaption = (text) => {
        this.setState({ caption: text })
    }

    bagikan(caption){
        AsyncStorage.setItem('caption', JSON.stringify(caption));
        Actions.ProgressUpload()
    }


    render() {
        return (
        <View>
            <ScrollView>
                
                <View style={{alignItems: 'center'}}>
                    {this.state.image ? this.renderAsset(this.state.image) : null}
                </View>

                <TextInput
                    style={{height: 100}}
                    editable = {true}
                    multiline = {true}
                    numberOfLines = {4}
                    placeholder='Tulis Keterangan ...'
                    onChangeText={this.handleCaption}
                />
            </ScrollView>

            <Button block success onPress={() => {this.bagikan(this.state.caption)}}>
                <Text>Bagikan</Text>
            </Button>

        </View>
        );
    }
}