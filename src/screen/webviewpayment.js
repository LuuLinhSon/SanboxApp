import React, { Component } from 'react';
import { WebView, View, TouchableHighlight, Image,Text} from 'react-native';
import {
  horizoltalscale,
  verticalScale,
  moderateScale
} from "../multiscreen/formula";

export default class WebViewPayment extends Component {
    render() {
        return <View style={{ flex: 1 }}>
            <View style={{ flex:1, backgroundColor: "#2196F3", flexDirection: "row", alignItems: "center", justifyContent: "center", height: verticalScale(40) }}>
              <TouchableHighlight onPress={this._onPressBack.bind(this)} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Image style={{ resizeMode: "contain", height: verticalScale(30), width: "100%" }} source={back} />
              </TouchableHighlight>

              <Text
                style={{
                  color: "#FFF",
                  fontSize: moderateScale(15),
                  textAlign: "center",
                  flex: 8
                }}
              >
                {" "}
                NẠP TIỀN{" "}
              </Text>

              <TouchableHighlight onPress={this._onPressSearch.bind()} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Image style={{ resizeMode: "contain", height: verticalScale(30), width: "100%" }} source={search} />
              </TouchableHighlight>
            </View>

            
            <View style={{flex:14}}>
                <WebView style={{ flex: 8, marginTop: 20 }} source={{ uri: "https://www.nganluong.vn/nganluong/home.html" }}/>
            </View>
          </View>;
    }


    _onPressBack(){
        this.props.navigation.goBack();
    }

    _onPressSearch(){

    }
}