import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  TextInput,
  Alert,
  AsyncStorage,
  Dimensions,
  Modal,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import axios from 'axios';
import {Actions} from 'react-native-router-flux'
var windowSize = Dimensions.get('window');
var RNFS = require('react-native-fs');

export default class DetailPost extends Component{

    constructor(){
        super()
        this.state = {
            foto_profil: '',
            id: '',
            post: '',
            idpost: '',
            caption: '',
            coment: '',
            suka: '',
            waktu: '',
            color: 'teal',
            modalVisible: false,
            items: [],
            komentar: [],
            ip : '192.168.0.12'
        }
        this.PostItem()
    }

    back(){
        Actions.Posting()
    }

    PostItem = async () =>{
        var id = await AsyncStorage.getItem('id');
        var id = id.replace(/\"/g, "");
        var PostItem = await AsyncStorage.getItem('PostItem');
        var PostItem = PostItem.replace(/\"/g, "");
        var potong = PostItem.substring(5,14);
        if(potong == 'thumbnail'){
            var PostItem = PostItem.replace("jpg","fff");
        }
        axios({
            method: 'post',
            url: 'http://'+this.state.ip+'/TA/get_postItem.php',
            data: {
                id: id,
                postItem: PostItem,
            }
        }).then((data) => {
            this.setState({foto_profil: data.data.post.foto_profil})
            this.setState({id: data.data.post.id})
            this.setState({post: data.data.post.post})
            this.setState({idpost: data.data.post.idpost})
            this.setState({caption: data.data.post.caption})
            this.setState({coment: data.data.post.coment})
            this.setState({suka: data.data.post.suka})
            this.setState({waktu: data.data.post.waktu})
        })
    }

    like(idpost){
        axios({
            method: 'post',
            url: 'http://'+this.state.ip+'/TA/like.php',
            data: {
                idpost: idpost,
                id: this.state.id
            }
        }).then((data) => {
            this.PostItem()
        })
    }

    setModalVisible(visible, idpost, caption, foto_profil, id, waktu){
        this.setState({modalVisible: visible});
        this.setState({idpost: idpost})
        this.setState({caption: caption})
        this.setState({foto_profil: foto_profil})
        this.setState({idOpost: id})
        this.setState({waktu: waktu})
        this.getComent(idpost)
    }

    tutup(visible){
        this.setState({modalVisible: visible});
    }

    onSendPress(){
        axios({
            method: 'post',
            url: 'http://'+this.state.ip+'/TA/coment.php',
            data: {
                idpost: this.state.idpost,
                id_coment: this.state.id,
                coment: this.state.message
            }
        }).then((data) => {
            this.setState({message: ''});
            this.getComent(this.state.idpost)
        })
    }

    getComent(idpost){
        axios({
            method: 'post',
            url: 'http://'+this.state.ip+'/TA/get_coment.php',
            data: {
                idpost: idpost,
            }
        }).then((data) => {
            this.setState({items : data.data.hasil.detail})
            const komentar = this.state.items.map((detail,i)=>{
                return(
                    <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 15}} key={i}>
                        <Thumbnail source={{uri: 'http://'+this.state.ip+'/TA/'+detail.foto_profil}} />
                        <View style={{marginLeft: 10}}>
                            <Text style={{color: 'teal', fontStyle: 'italic', fontWeight: 'bold'}}>{detail.idcoment}</Text>
                            <Text>{detail.coment}</Text>
                            <Text style={{fontSize: 13, marginTop: 5}}>{detail.waktu_coment}</Text>
                        </View>
                    </View>
                )
            })
            this.setState({komentar})
        })
    }

    hapus(idpost){
        Alert.alert(
            'Perhatian',
            'Anda yakin di hapus ??',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => this.beneran_hapus(idpost)},
            ],
            { cancelable: false }
          )
    }

    beneran_hapus(idpost){
        axios({
            method: 'post',
            url: 'http://'+this.state.ip+'/TA/hapus_post.php',
            data: {
                idpost: idpost,
            }
        }).then((data) => {
            Actions.Posting()
        })
    }

    download(fromURLs,idpost){
        var fromURL = 'http://'+this.state.ip+'/TA/'+fromURLs
        var filename = fromURLs.substring(5)
        var depan = fromURLs.substring(5,9)
        if(depan == 'post'){
            var toFile = RNFS.DocumentDirectoryPath + '/' + filename
            RNFS.downloadFile({fromUrl:fromURL, toFile: toFile}).promise.then(res => {
                AsyncStorage.setItem('testing', JSON.stringify(toFile));
                Actions.Views()
            });
        }else{
            axios({
                method: 'post',
                url: 'http://'+this.state.ip+'/TA/get_viewPDF.php',
                data: {
                    idpost: idpost,
                    fromUrls: fromURLs
                }
            }).then((data) => {
                var fromURL = 'http://'+this.state.ip+'/TA/'+data.data.get.PDF
                var filename = data.data.get.PDF.substring(4)
                var toFile = RNFS.DocumentDirectoryPath + '/' + filename
                RNFS.downloadFile({fromUrl:fromURL, toFile: toFile}).promise.then(res => {
                    AsyncStorage.setItem('testing', JSON.stringify(toFile));
                    Actions.Views_pdf()
                });
            })
        }
    }

    render() {
        return (
            <Container>
            <Header style={{backgroundColor:'teal'}}>
                <Left>
                    <Button transparent onPress={() => {
                    this.back()
                    }}>
                    <Icon name='arrow-back' style={{color: '#fff'}}/>
                    </Button>
                </Left>
                <Body>
                    <Title>Detail Post</Title>
                </Body>
                <Right>
                    <Button transparent onPress={() => {this.hapus(this.state.idpost)}}>
                    <Icon name='trash' style={{color: '#fff', fontSize: 50}}/>
                    </Button>
                </Right>
            </Header>
            <Content>
            <Card>
                <CardItem>
                <Left>
                    <Thumbnail source={{uri: 'http://'+this.state.ip+'/TA/'+this.state.foto_profil}} />
                    <Body>
                        <Text>{this.state.id}</Text>
                    </Body>
                </Left>
                </CardItem>
                <CardItem cardBody>
                    <TouchableOpacity onPress={() => {this.download(this.state.post,this.state.idpost)}}>
                        <Image source={{uri: 'http://'+this.state.ip+'/TA/'+this.state.post}} 
                        style={{height: (Dimensions.get('window').height/2) - 10, 
                        width: Dimensions.get('window').width}}/>
                    </TouchableOpacity>
                </CardItem>
                <CardItem>
                <Left>
                    <Button transparent onPress={()=>{this.like(this.state.idpost)}}>
                        <Icon active name="thumbs-up" style={{color: this.state.color, fontSize: 25}}/>
                        <Text style={{color: 'black'}}>{this.state.suka}</Text>
                    </Button>
                </Left>
                <Body>
                    <Button transparent
                    onPress={() => {this.setModalVisible(true, this.state.idpost, this.state.caption,this.state.foto_profil, this.state.id, this.state.waktu)}}>
                        <Icon active name="chatbubbles" style={{color: 'teal', fontSize : 25}}/> 
                        <Text style={{color: 'black'}}>{this.state.coment}</Text>
                    </Button>
                </Body>
                <Right>
                    <Text>{this.state.waktu}</Text>
                </Right>
                </CardItem>
                <CardItem>
                    <Text>{this.state.caption}</Text>
                </CardItem>
            </Card>
            </Content>

            <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {this.tutup(!this.state.modalVisible)}}
            >
            <View style={styles.container}>
            <Header style={{backgroundColor:'teal'}}>
                <Left>
                    <Button transparent onPress={()=>{this.tutup(!this.state.modalVisible)}}>
                    <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>Komentar</Title>
                </Body>
                <Right>
                    
                </Right>
            </Header>
            <View style={{flexDirection: 'row', margin: 5, borderBottomWidth: 1}}>
                <Thumbnail source={{uri: 'http://'+this.state.ip+'/TA/'+this.state.foto_profil}} />
                <View style={{marginLeft: 10}}>
                    <Text style={{color: 'teal', fontStyle: 'italic', fontWeight: 'bold'}}>{this.state.idOpost}</Text>
                    <Text>{this.state.caption}</Text>
                    <Text style={{fontSize: 13, marginTop: 5}}>{this.state.waktu}</Text>
                </View>
            </View>

            <View style={{flex: 1}}>
                <ScrollView
                    ref={(c) => this._scrollView = c}
                    onScroll={this.handleScroll}
                    scrollEventThrottle={16}
                    onContentSizeChange={(e) => {}}
                >
                    {this.state.komentar}
                </ScrollView>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.textContainer}>
                    <TextInput
                    style={styles.input}
                    value={this.state.message}
                    onChangeText={(text) => this.setState({message: text})}
                    />
                </View>
                <View style={styles.sendContainer}>
                    <TouchableHighlight
                    underlayColor={'teal'}
                    onPress={() => this.onSendPress()}
                    >
                    <Text style={{color: '#ffffff', fontSize: 15}}>SEND</Text>
                    </TouchableHighlight>
                </View>
            </View>
            </View>
        </Modal>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#ffffff'
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'teal'
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    sendContainer: {
        justifyContent: 'flex-end',
        paddingRight: 10
    },
    sendLabel: {
        color: '#ffffff',
        fontSize: 15
    },
    input: {
        width: windowSize.width - 70,
        color: '#555555',
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 5,
        height: 32,
        borderColor: '#6E5BAA',
        borderWidth: 1,
        borderRadius: 2,
        alignSelf: 'center',
        backgroundColor: '#ffffff'
      },
})