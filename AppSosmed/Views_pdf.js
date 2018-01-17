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
  Dimensions
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Header, Left, Body, Right,Text ,Button ,Title} from 'native-base';
import {Actions} from 'react-native-router-flux'
import axios from 'axios';
import Pdf from 'react-native-pdf';

export default class Views_pdf extends Component {
    constructor(){
        super()
        this.state = {
            pdfi: null,
        }
        this.muncul_pdf()
    }

    muncul_pdf = async () => {
        var pdfi = await AsyncStorage.getItem('testing');
        var pdfi = pdfi.replace(/\"/g, "");
        this.setState({pdfi: 'file://'+pdfi});
    }

    render() {
        var source = {uri:this.state.pdfi,cache:true};
        return (
            <View>
                <Pdf
                    source={source}
                    onLoadComplete={(pageCount,filePath)=>{
                        console.log(`total page count: ${pageCount}`);
                    }}
                    onPageChanged={(page,pageCount)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    style={styles.pdf}/>
            </View>
        )
    }
}
var styles = StyleSheet.create({
    pdf: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});