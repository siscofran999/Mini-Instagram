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
var lz77 = require('../AppSosmed/lz77');
import axios from 'axios';
var base64 = require('base-64');

export default class Tes extends Component {

    constructor(){
        super()
        this.state = {
            text: '',
            texts : '',
            ip : '192.168.73.29'
        }
    }

    handleId = (text) => {
        this.setState({ text: text })
    }
    
    kompress_lz77(text){
        var texts = lz77.compress(text);
        this.setState({texts})
    }

    kompress_huffman(text){
        axios({
            method: 'post',
            url: 'http://'+this.state.ip+'/TA/zzz_huffman.php',
            data: {
                text: text,
            }
        }).then((data) => {
            console.log(data)
            var texts = data.data.kompress.data
            var texts = base64.decode(texts);
            this.setState({texts})
        })
    }

    kompress_gab(text){
        var text = lz77.compress(text);
        axios({
            method: 'post',
            url: 'http://'+this.state.ip+'/TA/zzz_huffman.php',
            data: {
                text: text,
            }
        }).then((data) => {
            var texts = data.data.kompress.data
            var texts = base64.decode(texts);
            this.setState({texts})
        })
    }

    render() {
        return (
            <View>
                <TextInput 
                placeholder='Text'
                style={styles.input}
                onChangeText= {this.handleId}
                />

                <Button onPress={() => {this.kompress_lz77(this.state.text)}}>
                    <Text>Kompress LZ77</Text>
                </Button>

                <Button onPress={() => {this.kompress_huffman(this.state.text)}}>
                    <Text>Kompress Huffman</Text>
                </Button>

                <Button onPress={() => {this.kompress_gab(this.state.text)}}>
                    <Text>Kompress Gabungan</Text>
                </Button>

                <Text>{this.state.texts}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input:{
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.7)',
        marginBottom: 10,
        paddingHorizontal: 10
    },
})