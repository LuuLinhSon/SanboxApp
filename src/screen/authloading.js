import React , { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';


export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const value = AsyncStorage.getItem('User');
    console.log(value);
    AsyncStorage.getItem('User')
            .then((valuestr) => JSON.parse(valuestr))
            .then((data) => {
              if (data === null) {
                this.props.navigation.navigate('Auth');
              } else {
                this.props.navigation.navigate('App');
              }  
            });
    

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // this.props.navigation.navigate(value ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{flex:1}}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}