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
import PDFView from 'react-native-pdf-view';
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import {Actions} from 'react-native-router-flux'
var RNFS = require('react-native-fs');

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
        this.setState({pdfi: pdfi});
    }

    tutup(){
        Actions.Posting()
    }

    handleCaption = (text) => {
        this.setState({ caption: text })
    }

    bagikan(caption){
        this.post(caption)
    }

    post = async (caption) => {
        var id = await AsyncStorage.getItem('id');
        var id = id.replace(/\"/g, "");
        var pdf = await AsyncStorage.getItem('pdf');
        var pdf = pdf.replace(/\"/g, "");
        var pdf = 'file://'+pdf
        RNFS.readFile(pdf, 'base64').then(contents => {
                axios({
                    method: 'post',
                    url: 'http://192.168.12.54/TA/save_post_pdf.php',
                    data: {
                        id: id,
                        caption: caption,
                        post: contents,
                    }
                }).then((data) => {
                    Actions.Posting()
                })
        });
    }

    render() {
        return (
            <View>
            <ScrollView>
                <View style={{alignItems: 'center'}}>
                    <PDFView ref={(pdf)=>{this.pdfView = pdf;}}
                    path={this.state.pdfi}
                    onLoadComplete = {(pageCount)=>{
                    this.pdfView.setNativeProps({
                        zoom: 1.5
                    });
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