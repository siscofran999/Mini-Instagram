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
import * as Progress from 'react-native-progress';
var lz77 = require('./lz77');
import axios from 'axios';
import {Actions} from 'react-native-router-flux'
var RNFS = require('react-native-fs');
var base64 = require('base-64');

export default class ProgressUpload extends Component {
    constructor(){
        super()
        this.state = {
            progress: 0,
            pdfi: null,
            ip : '192.168.0.12'
        }
    }

    componentDidMount(){
        this.ProgressUpload()
    }

    ProgressUpload = async () => {
        var mime = await AsyncStorage.getItem('mime');
        var mime = mime.replace(/\"/g, "");
        if(mime != 'pdf'){
            var id = await AsyncStorage.getItem('id');
            this.setState({progress: 0.1})
            var id = id.replace(/\"/g, "");
            var datapost = await AsyncStorage.getItem('datapost');
            var datapost = datapost.replace(/\"/g, "");
            var caption = await AsyncStorage.getItem('caption');
            var caption = caption.replace(/\"/g, "");

            //ini LZ77 gambar
            console.log('mulai')
            this.setState({progress: 0.2})
            var contents = lz77.compress(datapost);
            this.setState({progress: 0.4})
            console.log('selesai')
            axios({
                method: 'post',
                url: 'http://'+this.state.ip+'/TA/testLZ77(1)PNG.php',
                data: {
                    id: id,
                    caption: caption,
                    post: contents,
                    mime: mime
                }
            }).then((data) => {
                this.setState({progress: 0.6})
                console.log(data)
                var filesizeEn = data.data.Post.berhasil
                var data = data.data.Post.data
                var data = base64.decode(data);
                console.log("go")
                var content = lz77.decompress(data);
                console.log("selesai")
                axios({
                    method: 'post',
                    url: 'http://'+this.state.ip+'/TA/testLZ77(2)PNG.php',
                    data: {
                        id: id,
                        caption: caption,
                        post: content,
                        mime: mime
                    }
                }).then((data) => {
                    console.log(data)
                    this.setState({progress: 0.7})
                    var filesizeDe = data.data.Post.berhasil
                    var Rasio = (filesizeEn / filesizeDe) * 100 + ' %'
                    this.setState({progress: 0.8})
                    console.log(Rasio)
                    Actions.Posting()
                })
            })
        }else{
            var pdfi = await AsyncStorage.getItem('pdf');
            var pdfi = pdfi.replace(/\"/g, "");
            var pdfi = 'file://'+pdfi
            this.setState({pdfi: pdfi});
            this.setState({progress: 0.2})
            var id = await AsyncStorage.getItem('id');
            var id = id.replace(/\"/g, "");
            var caption = await AsyncStorage.getItem('caption');
            var caption = caption.replace(/\"/g, "");
            this.setState({progress: 0.3})
            RNFS.readFile(this.state.pdfi, 'base64').then(contents => {
            //ini LZ77
            console.log('mulai')
            this.setState({progress: 0.4})
            var contents = lz77.compress(contents);
            this.setState({progress: 0.5})
            console.log('selesai')
                axios({
                    method: 'post',
                    url: 'http://'+this.state.ip+'/TA/testLZ77(1)PDF.php',
                    data: {
                        id: id,
                        caption: caption,
                        post: contents,
                    }
                }).then((data) => {
                    this.setState({progress: 0.6})
                    var filesizeEn = data.data.Post_pdf.berhasil
                    var data = data.data.Post_pdf.data
                    var data = base64.decode(data);
                    console.log("go")
                    this.setState({progress: 0.7})
                    var content = lz77.decompress(data);
                    this.setState({progress: 0.8})
                    console.log("selesai")
                    axios({
                        method: 'post',
                        url: 'http://'+this.state.ip+'/TA/testLZ77(2)PDF.php',
                        data: {
                            id: id,
                            caption: caption,
                            post: content,
                        }
                    }).then((data) => {
                        this.setState({progress: 0.9})
                        var filesizeDe = data.data.Post_pdf.berhasil
                        var Rasio = (filesizeEn / filesizeDe) * 100 + ' %'
                        console.log(Rasio)
                        Actions.Posting()
                    })
                })
            })
        }

    }

    render(){
        return(
            <View style={styles.container}>
                <Progress.Circle
                    progress={this.state.progress}
                    indeterminate={false}
                    showsText={true}
                    size={100}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingVertical: 20,
    },
})