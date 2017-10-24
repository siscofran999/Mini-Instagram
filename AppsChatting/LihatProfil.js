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
import axios from 'axios';
import {Actions} from 'react-native-router-flux'

export default class LihatProfil extends Component {
    constructor(){
        super()
        this.state = {
            id: '',
            nama: '',
            link: '',
            bio: '',
            avatarSource: require('../assets/avatar.png'),
            modalVisible: false,
        }
        this.get_profil()
    }

    get_profil = async () => {
        var id = await AsyncStorage.getItem('LihatProfil');
        var id = id.replace(/\"/g, "");
        this.setState({id: id});
        var PicProfil = await AsyncStorage.getItem('PicProfil');
        var PicProfil = PicProfil.replace(/\"/g, "");
        var link_foto = 'http://192.168.12.54/TA/'+PicProfil
        this.setState({avatarSource: {uri: link_foto}});
        axios({
            method: 'get',
            url: 'http://192.168.12.54/TA/get_foto.php?idTemen='+id+'&fotoTemen='+PicProfil,
        }).then((data) => {
            var nama = data.data.Berhasil.nama
            this.setState({nama: nama});
            var link = data.data.Berhasil.link
            this.setState({link: link});
            var bio = data.data.Berhasil.bio
            this.setState({bio: bio});
        })
    }

    back(){
        Actions.Home()
    }

    render() {
        return (
            <Image source={require('../assets/tes.jpg')} style={styles.backgroundImage}>
            <Header style={{top:0, backgroundColor: 'teal'}}>
                <Left>
                    <Button transparent onPress={()=>{this.back()}}>
                    <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>{this.state.id}</Title>
                </Body>
                <Right>
                    
                </Right>
            </Header>
            <View style={{flex: 1,
                justifyContent: 'center',
                alignItems: 'center'}}>
                <View style={{height: 150,
                    width: 150,
                    borderRadius: 50,
                    borderColor: '#a5a5a5',
                    borderWidth: 2}}>
                <Image source={this.state.avatarSource} style={{height: 150,
                    width: 150,
                    borderRadius: 50,
                    }}/>
                </View>
            <Text style={{fontSize: 20, color: 'black'}}>Hi {this.state.nama}</Text>
            <Text style={{fontSize: 20, color: 'blue'}} onPress={() => Linking.openURL('http://'+this.state.link)}>{this.state.link}</Text>
            <Text style={{fontSize: 20, color: 'black'}}>{this.state.bio}</Text>
            </View>
            </Image>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'cover'
    },
})