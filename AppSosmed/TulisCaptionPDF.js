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
import axios from 'axios';

import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import {Actions} from 'react-native-router-flux'
var RNFS = require('react-native-fs');
var lz77 = require('./lz77');
var base64 = require('base-64');
import Pdf from 'react-native-pdf';

export default class TulisCaptionPDF extends Component {

    constructor(){
        super()
        this.state = {
            modalVisible: false,
            Disable: true,
            pdfi: null,
            images: null,
            caption: '',
        }
        this.muncul_pdf()
    }

    muncul_pdf = async () => {
        var pdfi = await AsyncStorage.getItem('pdf');
        var pdfi = pdfi.replace(/\"/g, "");
        var pdfi = 'file://'+pdfi
        this.setState({pdfi: pdfi});
    }

    tutup(){
        Actions.Posting()
    }

    handleCaption = (text) => {
        this.setState({ caption: text })
    }

    bagikan(caption){
        AsyncStorage.setItem('caption', JSON.stringify(caption));
        Actions.ProgressUpload();
    }

    render() {
        var source = {uri:this.state.pdfi,cache:true};
        return (
            <View>
            <ScrollView>
                <View style={{alignItems: 'center'}}>

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

var styles = StyleSheet.create({
    pdf: {
        width: 300,
        height: 300,
    },
});