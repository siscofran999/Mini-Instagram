import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Alert,
  AsyncStorage,
  ScrollView,
  FlatList,
  Dimensions,
  RefreshControl,
  Modal,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
  ListView
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Container, Title, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import {Actions} from 'react-native-router-flux'
import axios from 'axios';
var windowSize = Dimensions.get('window');
var RNFS = require('react-native-fs');

export default class Home extends Component {

    constructor(){
        super()
        this.state = {
            id: '',
            post_foto: [],
            detail: [],
            details: new ListView.DataSource({rowHasChanged:(r1,r2) => r1 != r2}),
            refreshing: false,
            color: 'teal',
            modalVisible: false,
            idpost: '',
            idOpost: '',
            caption: '',
            foto_profil: '',
            waktu: '',
            message: '',
            items: [],
            komentar: [],
        }
    }

    componentDidMount(){
        this.home();
    }

    home = async () => {
        var id = await AsyncStorage.getItem('id');
        var id = id.replace(/\"/g, "");
        this.setState({id: id})
        axios({
            method: 'get',
            url: 'http://192.168.12.54/TA/get_postHome.php?limit=10',
        }).then((data) => {
            mang = data.data.hasil.detail
            this.setState({
                details : this.state.details.cloneWithRows(data.data.hasil.detail),
                detail: data.data.hasil.detail
            })
        })
    }

    download(fromURLs,idpost){
        var fromURL = 'http://192.168.12.54/TA/'+fromURLs
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
                url: 'http://192.168.12.54/TA/get_viewPDF.php',
                data: {
                    idpost: idpost,
                    fromUrls: fromURLs
                }
            }).then((data) => {
                var fromURL = 'http://192.168.12.54/TA/'+data.data.get.PDF
                var filename = data.data.get.PDF.substring(4)
                var toFile = RNFS.DocumentDirectoryPath + '/' + filename
                RNFS.downloadFile({fromUrl:fromURL, toFile: toFile}).promise.then(res => {
                    AsyncStorage.setItem('testing', JSON.stringify(toFile));
                    Actions.Views_pdf()
                });
            })
        }
    }

    logout(){
        AsyncStorage.removeItem('id');
        AsyncStorage.removeItem('nama');
        AsyncStorage.removeItem('api');
        AsyncStorage.removeItem('email');
        AsyncStorage.removeItem('pass');
        Actions.Loading();
    }

    _onRefresh(){
        this.setState({refreshing: true});
        this.home().then(() => {
            this.setState({refreshing: false});
        });
    }

    like(idpost){
        axios({
            method: 'post',
            url: 'http://192.168.12.54/TA/like.php',
            data: {
                idpost: idpost,
                id: this.state.id
            }
        }).then((data) => {
            this.home()
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
            url: 'http://192.168.12.54/TA/coment.php',
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
            url: 'http://192.168.12.54/TA/get_coment.php',
            data: {
                idpost: idpost,
            }
        }).then((data) => {
            this.setState({items : data.data.hasil.detail})
            const komentar = this.state.items.map((detail,i)=>{
                return(
                    <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 15}} key={i}>
                        <Thumbnail source={{uri: 'http://192.168.12.54/TA/'+detail.foto_profil}} />
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

    more = async () => {
        var lastId = this.state.detail.slice(-1)[0].idpost
        var id = await AsyncStorage.getItem('id');
        var id = id.replace(/\"/g, "");
        this.setState({id: id})
        axios({
            method: 'get',
            url: 'http://192.168.12.54/TA/get_postHome.php?batas=5&lastid='+lastId,
        }).then((data) => {
            var res = data.data.hasil.detail
            if(res.length !=0){
                mang = mang.concat(res)
                this.setState({
                    details : this.state.details.cloneWithRows(mang),
                    detail: mang
                })
            }else{
                Alert.alert('Maaf, Data sudah habis')
            }
        })
    }

    lihatProfil(id, foto_profil){
        AsyncStorage.setItem('LihatProfil', JSON.stringify(id));
        AsyncStorage.setItem('PicProfil', JSON.stringify(foto_profil));
        Actions.LihatProfil();
    }

    render() {
        return (
            <View>
            <Header style={{top:0, backgroundColor: 'teal'}}>
                <Body>
                    <Title>Home</Title>
                </Body>
                <Right>
                    <Button transparent>
                    <Text onPress={() => {this.logout()}}>Logout</Text>
                    </Button>
                </Right>
            </Header>
        <View style={{marginBottom:120}}>
        <ListView
            onEndReached={this.more.bind(this)}
            onEndReachedThreshold={5}
            dataSource={this.state.details}
            renderRow={(rowData)=>

                <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: 'http://192.168.12.54/TA/'+rowData.foto_profil}} />
                        <Body>
                            <Text onPress={() => {this.lihatProfil(rowData.id, rowData.foto_profil)}}>{rowData.id}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <TouchableOpacity onPress={() => {this.download(rowData.post,rowData.idpost)}}>
                        <Image source={{uri: 'http://192.168.12.54/TA/'+rowData.post}} 
                        style={{height: (Dimensions.get('window').height/2) - 10, width: Dimensions.get('window').width}}/>
                    </TouchableOpacity>
                </CardItem>
                <CardItem>
                <Left>
                    <Button transparent onPress={()=>{this.like(rowData.idpost)}}>
                        <Icon active name="thumbs-up" style={{color: this.state.color, fontSize: 25}}/>
                        <Text style={{color: 'black'}}>{rowData.suka}</Text>
                    </Button>
                </Left>
                <Body>
                    <Button transparent 
                    onPress={() => {this.setModalVisible(true, rowData.idpost, rowData.caption,rowData.foto_profil, rowData.id, rowData.waktu)}}>
                        <Icon active name="chatbubbles" style={{color: 'teal', fontSize: 25}}/> 
                        <Text style={{color: 'black'}}>{rowData.coment}</Text>
                    </Button>
                </Body>
                <Right>
                    <Text>{rowData.waktu}</Text>
                </Right>
                </CardItem>
                <CardItem>
                    <Text>{rowData.caption}</Text>
                </CardItem>
                </Card>

            }
            refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                />
            }/>
            {/* <TouchableOpacity style={styles.circle} onPress={() => {this.more()}}>
                <Text style={{color:'teal', fontSize:20, fontWeight:'bold'}}>Load More ...</Text>
            </TouchableOpacity> */}
        </View>
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
                <Thumbnail source={{uri: 'http://192.168.12.54/TA/'+this.state.foto_profil}} />
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
        </View>
        );
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
    circle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30
    },
    
})