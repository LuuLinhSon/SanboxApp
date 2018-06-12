/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import {MyApp} from "./src/navigator/router";
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader"
]);

global.isLogin = false;
global.fullname = "";
global.vip = false;

export default class App extends Component {
  componentDidMount(){
    AsyncStorage.getItem("Status")
      .then((data) => {
        if(data !== null){
          global.isLogin = true;
          console.log("Status : " + data + "");
        }
        
      });
    AsyncStorage.getItem("Fullname")
    .then(data => {
      if(data !== null){
        global.fullname = data;
        console.log("Fullname : " + data + "");
      }
    });  
  }
  render() {
    return (
     <MyApp/>
    );
  }
}
