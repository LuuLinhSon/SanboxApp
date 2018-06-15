import { StyleSheet, View, Text, ListView, Image, DrawerLayoutAndroid, TouchableHighlight, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';
import styles from "../style/styles";
import { horizoltalscale, verticalScale, moderateScale } from "../multiscreen/formula";
import Pdf from "react-native-pdf";
// import RNProgressHUB from "react-native-progresshub";
export default class DocumentDetailScreen extends Component {

    constructor(props){
        super(props);

        search = require("../icons/search.png");
        back = require("../icons/back.png");
        key = require("../icons/answer.png");
        data = [];
        
        this.state={
           dataObj:{}
        }

    }

    componentDidMount() {
        // RNProgressHUB.showSpinIndeterminate();
        try {
            fetch("http://readbook.vietesoft.com/api/ApiGetData?clientKey=676e8b1b13e894b7bc65c085d120fc25&token=6372f6d26d318a17348c3a383a03623f&type=json")
                .then((response) => response.json())
                .then((resdata) => {
                    // RNProgressHUB.dismiss();
                    data = resdata.data.lstDoc;
                    for (dataID of data) {
                        if (dataID.ID === this.props.navigation.getParam('calldoc').id) {
                            this.setState({
                               dataObj:dataID
                            });
                        }
                    }
                    console.log("ListDetail : " + JSON.stringify(this.state.dataObj.FileQuestion));
                    // console.log("ListDetail : " + (dataObj.FileQuestion));
                    
                });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    render(){
        return(
            <View style={{flex:1}}>
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

                <Text
                    style={{
                        color: "#FFF",
                        fontSize: moderateScale(15),
                        textAlign: "center",
                        flex: 8
                    }}
                >
                    {" "}
                    {this.props.navigation.getParam('calldoc').title}
                    {" "}
                </Text>

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Answer", { calldocid: this.state.dataObj.ID })} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Image style={{ resizeMode: "contain", height: verticalScale(30), width: "100%" }} source={key} />
                </TouchableOpacity>
            </View>
        );
    }

    _renderContentView() {
        return(
            <View style={{ flex:13}}>
                <Pdf style={{flex:1}} source={{uri : this.state.dataObj.FileQuestion}}/>
            </View>
        );
    }

    _onPressBack(){
        this.props.navigation.goBack();
    }


}