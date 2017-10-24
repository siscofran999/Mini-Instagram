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
import axios from 'axios';
import PDFView from 'react-native-pdf-view';

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
        this.setState({pdfi: pdfi});
    }

    render() {
        return (
            <PDFView ref={(pdf)=>{this.pdfView = pdf;}}
            path={this.state.pdfi}
            onLoadComplete = {(pageCount)=>{
            this.pdfView.setNativeProps({
                zoom: 1
            });
            }}
            style={styles.pdf}/>
        )
    }
}
var styles = StyleSheet.create({
    pdf: {
        flex:1
    }
});