import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  TextInput,
} from 'react-native';
import {Router, Scene} from 'react-native-router-flux'
import Login from './App'
import Loading from './Loading'
import Register from './Register'
import Home from './Home'
import Profile from './Profile'
import Posting from './Posting'
import TulisCaption from './TulisCaption'
import TulisCaptionPDF from './TulisCaptionPDF'
import DetailPost from './DetailPost'
import Views from './Views'
import Views_pdf from './Views_pdf'
import LihatProfil from './LihatProfil'

export default class Route extends Component {
  render() {
    return (
        <Router>
        <Scene key="root">
            <Scene
                key="Loading"
                component={Loading}
                initial
                header={false}
            />
            <Scene
                key="Login"
                component={Login}
                header={false}
            />
            <Scene
                key="Register"
                component={Register}
                header={false}
            />
            <Scene key="tabbar" tabs={true} tabBarPosition= 'bottom' tabBarStyle={{backgroundColor:'teal'}}>
            <Scene
              key="Home"
              component={Home}
              hideNavBar={true}
            />
            <Scene
              key="Posting"
              component={Posting}
              hideNavBar={true}
            />
            <Scene
              key="Profile"
              component={Profile}
              hideNavBar={true}
            />
          </Scene>
          <Scene
                key="TulisCaption"
                component={TulisCaption}
                header={false}
            />
            <Scene
                key="TulisCaptionPDF"
                component={TulisCaptionPDF}
                header={false}
            />
            <Scene
                key="DetailPost"
                component={DetailPost}
                header={false}
            />
            <Scene
                key="Views"
                component={Views}
                title="Lihat Post"
                navigationBarStyle={{backgroundColor:'teal'}}
                titleStyle={{color:'white'}}
            />
            <Scene
                key="Views_pdf"
                component={Views_pdf}
                title="Lihat Post"
                navigationBarStyle={{backgroundColor:'teal'}}
                titleStyle={{color:'white'}}
            />
            <Scene
                key="LihatProfil"
                component={LihatProfil}
                header={false}
            />
        </Scene>
        </Router>
    );
}
}