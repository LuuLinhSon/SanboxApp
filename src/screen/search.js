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

        search = require("../icons/baseline_search_white_18dp.png");
        back = require("../icons/baseline_keyboard_arrow_left_white_18dp.png");

        data = [];
        this.state = {
            dataSource: ds.cloneWithRows(data),
            vip: false,
            search:""
        };
    }

    componentDidMount() {
        
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
                <TouchableHighlight onPress={this._onPressBack.bind(this)} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Image style={{ resizeMode: "contain", height: verticalScale(30), width: "100%" }} source={back} />
                </TouchableHighlight>

                <View
                    style={{
                        flex: 8,
                        height:'100%'
                    }}
                >
                {textInputSearch(this)}
                </View>

                <TouchableHighlight onPress={this._onPressSearch.bind(this)} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Image style={{ resizeMode: "contain", height: verticalScale(30), width: "100%" }} source={search} />
                </TouchableHighlight>
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
        return <TouchableOpacity
            onPress={() => {
                if ((datasource.Fee === true) && (global.vip === true)) {
                    this.props.navigation.navigate("Detail", {
                        calldoc: datasource.ID
                    });
                    console.log("1");
                } else if (datasource.Fee === false) {
                    this.props.navigation.navigate("Detail", {
                        calldoc: datasource.ID
                    });
                    console.log("2");
                } else {
                    alert("Bạn cần tài khoản VIP để xem tài liệu này!");
                }
            }}
            style={{ flex: 1, justifyContent: "center", alignItems: "center", height: verticalScale(80), width: "100%" }}>
            <View style={{ flex: 100, flexDirection: "row", height: verticalScale(100), width: "100%", backgroundColor: "#FFF", margin: moderateScale(3), justifyContent: "center", alignItems: "center" }}>
                <Image style={{ resizeMode: "contain", height: verticalScale(100), flex: 1 }} source={{ uri: datasource.Photo }} />
                <Text
                    style={{
                        flex: 5,
                        fontWeight: "bold",
                        margin: moderateScale(2)
                    }}
                >
                    {datasource.Title}
                </Text>
            </View>
            <View style={{ flex: 1, height: verticalScale(2), width: "100%", backgroundColor: "#000" }} />
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