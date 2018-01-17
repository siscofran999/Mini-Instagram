import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Alert,
  AsyncStorage,
  TouchableOpacity,
  Platform,
  Modal,
  TouchableHighlight,
  TextInput,
  ScrollView,
  Linking
} from 'react-native';
import { Header, Left, Body, Right,Text ,Button ,Title, Icon} from 'native-base';
var ImagePicker = require('react-native-image-picker');
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

export default class Profile extends Component {
    constructor(){
        super()
        this.state = {
            id: '',
            nama: '',
            email: '',
            link: '',
            bio: '',
            avatarSource: require('../assets/avatar.png'),
            imgBase64: '',
            modalVisible: false,
            Disable: false,
            ip : '192.168.0.12'
        }
        this.get_foto()
    }

    get_foto = async () => {
        var id = await AsyncStorage.getItem('id');
        var id = id.replace(/\"/g, "");
        this.setState({id: id});
        var nama = await AsyncStorage.getItem('nama');
        var nama = nama.replace(/\"/g, "");
        this.setState({nama: nama});
        var email = await AsyncStorage.getItem('email');
        var email = email.replace(/\"/g, "");
        this.setState({email: email});

        axios({
            method: 'get',
            url: 'http://'+this.state.ip+'/TA/get_foto.php?id='+this.state.id+'&nama='+this.state.nama,
        }).then((data) => {
            var get_foto = data.data.Berhasil.Dapetfoto
            var link = data.data.Berhasil.link
            this.setState({link: link});
            var bio = data.data.Berhasil.bio
            this.setState({bio: bio});
            if(get_foto != ''){
                var link_foto = 'http://'+this.state.ip+'/TA/'+get_foto
                this.setState({avatarSource: {uri: link_foto}});
            }
        })
    }

    selectPhotoTapped() {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true
          }
        };
    
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            var source, temp;
            // You can display the image using either:
            //source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
    
            temp = response.data;
    
            //Or:
            if (Platform.OS === 'android') {
              source = {uri: response.uri, isStatic: true};
            } else {
              source = {uri: response.uri.replace('file://', ''), isStatic: true};
            }

            axios({
                method: 'post',
                url: 'http://'+this.state.ip+'/TA/save_foto.php',
                data: {
                    id: this.state.id,
                    nama: this.state.nama,
                    temp: temp,
                }
            }).then((data) => {
                var berhasil = data.data.Berhasil;
                if(berhasil){
                    this.setState({
                        avatarSource: source,
                        imgBase64: temp,
                    });
                }
            })
          }
        });
    }

    setModalVisible(visible){
        this.setState({modalVisible: visible});
    }

    handleID = (text) => {
        this.setState({ id: text })
    }

    handleNama = (text) => {
        this.setState({ nama: text })
    }

    handleEmail = (text) => {
        var atpos = text.indexOf("@");
        var dotpos = text.lastIndexOf(".");
        // if (atpos<1 || dotpos<atpos+2 || dotpos+2>=text.length) {
        //     this.setState({ Disable: true})
            this.setState({ email: text })
        // }else{
            this.setState({ email: text })
            //this.setState({ Disable: false})
        //}
    }

    handleLink = (text) => {
        this.setState({ link: text })
    }

    handleBio = (text) => {
        this.setState({ bio: text })
        
    }

    submit(id,nama,email,link,bio){
        this.update(id,nama,email,link,bio)
    }

    update = async (id, nama,email,link,bio) => {
        var pass= await AsyncStorage.getItem('pass');
        var pass = pass.replace(/\"/g, "");
        axios({
            method: 'post',
            url: 'http://'+this.state.ip+'/TA/update_profile.php',
            data: {
                id: id,
                nama: nama,
                email: email,
                pass: pass,
                link: link,
                bio: bio,
            }
        }).then((data) => {
            if(data.data.sukses){
                AsyncStorage.setItem('nama', JSON.stringify(nama));
                AsyncStorage.setItem('id', JSON.stringify(id));
                AsyncStorage.setItem('email', JSON.stringify(email));
                Alert.alert('Selamat, profile anda berhasil diupdate')
            }
            
        })
    }

    render() {
        return (
            <Image source={require('../assets/tes.jpg')} style={styles.backgroundImage}>
            <Header style={{top:0, backgroundColor: 'teal'}}>
                <Body>
                    <Title>{this.state.id}</Title>
                </Body>
                <Right>
                    <Button transparent onPress={() => {this.setModalVisible(true)}}>
                    <Text>Edit Profile</Text>
                    </Button>
                </Right>
            </Header>
            <View style={{flex: 1,
                justifyContent: 'center',
                alignItems: 'center',}}>
            <View style={{height: 150,
                width: 150,
                borderRadius: 50,
                borderColor: '#a5a5a5',
                borderWidth: 2}}>
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <Image source={this.state.avatarSource} style={{height: 150,
                width: 150,
                borderRadius: 50,
                }}/>
                </TouchableOpacity>
            </View>
            <Text style={{fontSize: 20, color: 'black'}}>Hi {this.state.nama}</Text>
            <Text style={{fontSize: 20, color: 'blue'}} onPress={() => Linking.openURL('http://'+this.state.link)}>{this.state.link}</Text>
            <Text style={{fontSize: 20, color: 'black'}}>{this.state.bio}</Text>
            </View>

            <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {this.setModalVisible(!this.state.modalVisible)}}
            >
          <View style={styles.container}>
          <Header style={{backgroundColor:'teal'}}>
              <Left>
                  <Button transparent onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                  }}>
                  <Icon name='arrow-back' style={{color: '#fff'}}/>
                  </Button>
              </Left>
            <Body style={{marginLeft: -113}}>
              <Title>Edit Profile</Title>
            </Body>
          </Header>
          <View style={styles.formContainer}>
          <ScrollView>
          <TextInput
            value={this.state.id}
            ref={component => this._kosong1 = component}
            placeholder='ID'
            style={styles.input}
            onChangeText= {this.handleID}
            editable={false}
          />
          <TextInput
            value={this.state.nama}
            ref={component => this._kosong1 = component}
            placeholder='Nama'
            style={styles.input}
            onChangeText= {this.handleNama}
          />
          <TextInput 
            value={this.state.email}
            ref={component => this._kosong1 = component}
            placeholder='Email'
            style={styles.input}
            keyboardType='email-address'
            onChangeText= {this.handleEmail}
          />
          <TextInput 
            value={this.state.link}
            ref={component => this._kosong1 = component}
            placeholder='Link'
            style={styles.input}
            onChangeText= {this.handleLink}
          />
          <TextInput
            style={{height: 100}}
            editable = {true}
            multiline = {true}
            numberOfLines = {4}
            maxLength = {255}
            placeholder='Bio'
            onChangeText={this.handleBio}
            value={this.state.bio}
          />
          </ScrollView>

          <Button block success 
          onPress={() => {this.submit(this.state.id,this.state.nama,this.state.email,this.state.link, this.state.bio)}} disabled= {this.state.Disable}>
            <Text>Update Profile</Text>
          </Button>
          </View>
         </View>
        </Modal>
            </Image>
            
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'cover'
    },
    container:{
        flex: 1,
    },

    formContainer:{
        padding: 20,
        justifyContent: 'center'
    },

    input:{
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.7)',
        marginBottom: 10,
        paddingHorizontal: 10
    },
})