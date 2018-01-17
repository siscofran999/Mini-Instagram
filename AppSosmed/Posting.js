import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Alert,
  Platform,
  Modal,
  TouchableOpacity,
  ScrollView,
  Text,
  Dimensions,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header, Left, Body, Right,Button ,Title, connectStyle} from 'native-base';
import axios from 'axios';
import {Actions} from 'react-native-router-flux'
import ImagePickerCrop from 'react-native-image-crop-picker';
var RNFS = require('react-native-fs');
var SavePath = Platform.OS === 'ios' ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath;
var FilePickerManager = require('NativeModules').FilePickerManager;

export default class Posting extends Component {

    constructor(){
        super()
        this.state = {
            modalVisible: false,
            Disable: true,
            image: null,
            images: null,
            mime: null,
            data: '',
            post_foto: [],
            items: [],
            doc: null,
            docName: null,
            file: '',
            ip : '192.168.0.12'
        }
        this.tampilPost()
    }

    tampilPost = async () =>{
        var id = await AsyncStorage.getItem('id');
        var id = id.replace(/\"/g, "");
        axios({
            method: 'post',
            url: 'http://'+this.state.ip+'/TA/get_post.php',
            data: {
                id: id,
            }
        }).then((data) => {
            let items = []
            data.data.hasil.detail.map(({post})=>{
                var link_post = 'http://'+this.state.ip+'/TA/'+post
                this.setState({post_foto: {uri: link_post}});
                items.push( <TouchableOpacity key ={post} onPress={() => this.detail_post(post)}>
                        <View>
                            <Image 
                            style={styles.post}
                            source= {this.state.post_foto}/>
                        </View>
                    </TouchableOpacity>)
            })
            this.setState({items})
        })
    }

    detail_post(PostItem){
        AsyncStorage.setItem('PostItem', JSON.stringify(PostItem));
        Actions.DetailPost()
    }

    setModalVisible(visible){
        this.setState({modalVisible: visible});
    }

    pickSingleWithCamera(cropping) {
        ImagePickerCrop.openCamera({
          includeBase64: true
        }).then(image => {
            if(image.size > 1500000){
                Alert.alert('Maaf, batas upload < 1,5 mb')
                Actions.Posting();
            }else{
                this.setState({
                    data: image.data,
                    image: {uri: image.path, width: image.width, height: image.height},
                    images: null,
                    mime: image.mime
                  });
                  this.setModalVisible(false)
                  AsyncStorage.setItem('image', JSON.stringify(this.state.image.uri));
                  AsyncStorage.setItem('datapost', JSON.stringify(this.state.data));
                  AsyncStorage.setItem('mime', JSON.stringify(this.state.mime));
                  Actions.TulisCaption();
            }
        }).catch(e => alert(e));
    }

    pickSingle(cropit, circular=false) {
        ImagePickerCrop.openPicker({
          includeBase64: true
        }).then(image => {
            if(image.size > 1500000){
                Alert.alert('Maaf, batas upload < 1,5 mb')
                Actions.Posting();
            }else{
                this.setState({
                    data: image.data, 
                    image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
                    images: null,
                    mime: image.mime
                  });
                  this.setModalVisible(false)
                  AsyncStorage.setItem('image', JSON.stringify(this.state.image.uri));
                  AsyncStorage.setItem('datapost', JSON.stringify(this.state.data));
                  AsyncStorage.setItem('mime', JSON.stringify(this.state.mime));
                  Actions.TulisCaption();   
            }
        }).catch(e => {
          console.log(e);
          Alert.alert(e.message ? e.message : e);
        });
    }

    tambah(){
        this.setModalVisible(true)
    }
    
    handlePress() {
        // untuk pick file pdf
        const options = {
            title: 'File Picker',
            chooseFileButtonTitle: 'Choose File...'
        };
        FilePickerManager.showFilePicker(options, (response) => {
            this.setModalVisible(false)
            AsyncStorage.setItem('pdf', JSON.stringify(response.path));
            var mime = 'pdf';
            AsyncStorage.setItem('mime', JSON.stringify(mime));
            Actions.TulisCaptionPDF()
            if (response.didCancel) {
              console.log('User cancelled photo picker');
            }
            else if (response.error) {
              console.log('ImagePickerManager Error: ', response.error);
            }
            else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            }
            else {
              this.setState({
                file: response
              });
            }
        });
    }

    render() {
        return (
            <View>
            <Header style={{top:0, backgroundColor: 'teal'}}>
                <Body>
                    <Title>Posting</Title>
                </Body>
                <Right>
                    <Button transparent onPress={() => this.tambah()}>
                    <Icon name='camera-enhance' style={{color: '#fff', fontSize: 50}} />
                    </Button>
                </Right>
            </Header>

            <ScrollView>
                <View style={styles.container}>
                    {this.state.items}
                </View>
            </ScrollView>

            <Modal
            animationType={"slide"}
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {this.setModalVisible(!this.state.modalVisible)}}
            >
            <View style={styles.modal2}>
                <View style={styles.modal3}>
                    <View style={styles.modalText}>
                    <Text style={styles.textContent}>Select a Photo</Text>
                    <TouchableOpacity onPress={() => this.pickSingleWithCamera(true)}>
                        <Text style={styles.pilih}>Take Photo ...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.pickSingle(true,false)}>
                        <Text style={styles.pilih2}>Choose from Library ...</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handlePress()}>
                        <Text style={styles.pilih2}>See a PDF ...</Text>
                    </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                        <Text style={styles.cancel}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </Modal>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      backgroundColor: 'blue',
      marginBottom: 10
    },
    text: {
      color: 'white',
      fontSize: 20,
      textAlign: 'center'
    },
    modal2: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modal3:{
        width: 350,
        height: 250,
        backgroundColor: '#fff',
        opacity: 1
    },
    modalText:{
        margin: 20
    },
    textContent: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    },
    pilih:{
        fontSize: 15,
        marginTop: 30,
        color: '#000'
    },
    pilih2:{
        fontSize: 15,
        marginTop: 20,
        color: '#000'
    },
    cancel:{
        textAlign: 'center',
        fontSize: 20,
        color: 'teal'
    },
    post: {
        width: (Dimensions.get('window').width/3) - 4,
        height: (Dimensions.get('window').height/4) - 12,
        margin: 2,
        padding: 2,
        borderRadius: 10
    }
  });