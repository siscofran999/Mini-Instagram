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

export default class TulisCaption extends Component {

    constructor(){
        super()
        this.state = {
            modalVisible: false,
            Disable: true,
            image: null,
            images: null,
            caption: '',
        }
        this.muncul_foto()
    }

    muncul_foto = async () => {
        var foto = await AsyncStorage.getItem('image');
        console.log(foto)
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
        this.post(caption)
    }

    post = async (caption) => {
        var id = await AsyncStorage.getItem('id');
        var id = id.replace(/\"/g, "");
        var datapost = await AsyncStorage.getItem('datapost');
        var datapost = datapost.replace(/\"/g, "");
        axios({
            method: 'post',
            url: 'http://192.168.12.54/TA/save_post.php',
            data: {
                id: id,
                caption: caption,
                post: datapost,
            }
        }).then((data) => {
            console.log(data)
            Actions.Posting()
        })
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