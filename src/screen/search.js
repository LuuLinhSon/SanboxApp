import { StyleSheet, View, Text, ListView, Image, DrawerLayoutAndroid, TouchableHighlight, TouchableOpacity, AsyncStorage } from 'react-native';
import React, { Component } from 'react';
import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';
import styles from "../style/styles";
import { horizoltalscale, verticalScale, moderateScale } from "../multiscreen/formula";
import {
    textInputSearch
} from "../multiscreen/renderComponentOS";
import RNProgressHUB from "react-native-progresshub";

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class SearchScreen extends Component {

    constructor(props) {
        super(props);

        search = require("../icons/search.png");
        back = require("../icons/back.png");
        vip = require("../icons/vip.png");
        
        data = [];
        this.state = {
            dataSource: ds.cloneWithRows(data),
            vip: false,
            search:""
        };
    }

    componentDidMount() {
        AsyncStorage.getItem("UserUpdate")
          .then(valuestr => JSON.parse(valuestr))
          .then(data => {
            if (data === null) {
              AsyncStorage.getItem("User")
                .then(valuestr => JSON.parse(valuestr))
                .then(data => {
                  this.setState({ vip: data.data.vip });
                  console.log("Lấy token trong Personal : " + data.token);
                  AsyncStorage.setItem("Token", data.token);
                });
            } else {
              AsyncStorage.getItem("UserUpdate")
                .then(valuestr => JSON.parse(valuestr))
                .then(data => {
                  this.setState({ vip: data.data.vip });
                });
            }
          }); 
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this._renderViewToolBar()}
                {this._renderContentView()}
            </View>
        );
    }

    _renderViewToolBar() {
        return (
            <View style={{ flex: 1, backgroundColor: "#2196F3", flexDirection: "row", alignItems: "center", justifyContent: "center", height: verticalScale(50) }}>
                <TouchableOpacity onPress={this._onPressBack.bind(this)} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Image style={{ resizeMode: "contain", height: verticalScale(30), width: "100%" }} source={back} />
                </TouchableOpacity>

                <View
                    style={{
                        flex: 8,
                        height:'100%'
                    }}
                >
                {textInputSearch(this)}
                </View>

                <TouchableOpacity onPress={this._onPressSearch.bind(this)} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Image style={{ resizeMode: "contain", height: verticalScale(30), width: "100%" }} source={search} />
                </TouchableOpacity>
            </View>
        );
    }

    _renderContentView() {
        return (
            <View style={{ flex: 14, backgroundColor: '#FFF' }}>
                <ListView
                    style={{ height: '100%', width: "100%", backgroundColor: "#FFF", marginBottom: verticalScale(5) }}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    enableEmptySections={true}
                />
            </View>
        );
    }

    _renderRow(datasource) {
        return <TouchableOpacity onPress={() => {
            if ((datasource.Fee === true) && (this.state.vip === true)) {
                this.props.navigation.navigate("Detail", {
                    calldoc: { id: datasource.ID, title: datasource.Title }
                });
                console.log("1");
            } else if (datasource.Fee === false) {
                this.props.navigation.navigate("Detail", {
                    calldoc: { id: datasource.ID, title: datasource.Title }
                });
                console.log("2");
            } else {
                alert("Bạn cần tài khoản VIP để xem tài liệu này!");
            }
        }}
            style={{ flex: 1, justifyContent: "center", alignItems: "center", height: verticalScale(100), width: "100%", padding: moderateScale(5) }}>
            <View style={{ flex: 100, flexDirection: "row", height: verticalScale(100), width: "100%", backgroundColor: "#FFF", margin: moderateScale(3), justifyContent: "center", alignItems: "center" }}>
                <Image style={{ resizeMode: "contain", height: verticalScale(100), flex: 1 }} source={{ uri: datasource.Photo }} />

                <View style={{ flex: 5, marginLeft: horizoltalscale(5) }}>
                    <Text style={{
                        flex: 1,
                        fontWeight: "bold",
                        fontSize: 16,
                        color: '#000',
                        margin: moderateScale(2)
                    }}>
                        {datasource.Title}
                    </Text>

                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", alignSelf: "flex-start", marginTop: verticalScale(3), marginLeft: horizoltalscale(2) }}>

                        <Text
                            style={{
                                color: "#2196F3",
                                fontSize: moderateScale(12),
                                textAlign: "center"
                            }}
                        >
                            Lượt xem:0
                            </Text>

                        <View style={{ width: 1, height: verticalScale(20), backgroundColor: "#2196F3", marginLeft: horizoltalscale(5), marginRight: horizoltalscale(5), }} />

                        {datasource.Fee ? (
                            <Image
                                style={{
                                    resizeMode: "contain",
                                    height: verticalScale(30),
                                    width: horizoltalscale(40)
                                }}
                                source={vip}
                            />
                        ) : (
                                <Text style={{
                                    color: "#2196F3",
                                    fontSize: moderateScale(12),
                                    textAlign: "center"
                                }}
                                >
                                    Tài liệu miễn phí
                            </Text>
                            )
                        }
                    </View>
                </View>

            </View>
        </TouchableOpacity>;
    }


    _onPressBack() {
        this.props.navigation.goBack();
       
    }

    _onPressSearch() {
        // RNProgressHUB.showSpinIndeterminate();
        try {
            fetch("http://readbook.vietesoft.com/api/apidocument?documentsearch&title="+ this.state.search + "&tag=abc&type=json")
            .then((response) => response.json())
            .then((resdata) => {
            //  RNProgressHUB.dismiss();   
             if(resdata.status === true){
                 data = resdata.data;
                 console.log("Search : " + JSON.stringify(data));
                 this.setState({
                     dataSource: ds.cloneWithRows(data)
                 });
             }else{
                 alert("Không tìm thấy kết quả");             
                }  
        });
         } catch (error) {
         console.log(error);
        throw error;
        }
 }

}