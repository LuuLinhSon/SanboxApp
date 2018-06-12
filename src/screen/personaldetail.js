import React, { Component } from 'react';
import {
    Text, View, Image, TouchableHighlight, AsyncStorage
} from 'react-native';
import styles from '../style/styles';
import { textInputUserName, textInputPassword } from '../multiscreen/renderComponentOS';
import { horizoltalscale, verticalScale, moderateScale } from "../multiscreen/formula";

export default class PersonalDetailScreen extends Component {

    constructor(props) {
        super(props);

        user = require("../icons/userfb.jpg");
        lend = require("../icons/baseline_lens_black_18dp.png");
        menu = require("../icons/baseline_menu_white_18dp.png");
        search = require("../icons/baseline_search_white_18dp.png");
        tailieunho = require("../icons/if_book_edit_35733.png");
        canhannho = require("../icons/if_system-users_15357.png");
        back = require("../icons/baseline_keyboard_arrow_left_white_18dp.png");

        this.state = {
            username: "",
            fullname: "",
            password: "",
            email: "",
            address: "",
            numberphone: "",
            vip: false
        }

    }

    componentDidMount(){
        AsyncStorage.getItem("UserUpdate")
          .then(valuestr => JSON.parse(valuestr))
          .then(data => {
            if (data === null) {
              AsyncStorage.getItem("User")
                .then(valuestr => JSON.parse(valuestr))
                .then(data => {
                  this.setState({
                    username: data.data.UserName,
                    fullname: data.data.CustName,
                    email: data.data.Email,
                    address: data.data.Address,
                    numberphone: data.data.Phone,
                    isLoading: false,
                    vip: data.data.vip
                  });
                });
            } else {
              AsyncStorage.getItem("UserUpdate")
                .then(valuestr => JSON.parse(valuestr))
                .then(data => {
                  this.setState({
                    username: data.data.UserName,
                    fullname: data.data.CustName,
                    email: data.data.Email,
                    address: data.data.Address,
                    numberphone: data.data.Phone,
                    vip: data.data.vip
                  });
                });
            }
          }); 

          
    }

    render() {
        console.log("Chi tiết VIP" + this.state.vip);
        return (
            <View style={{ flex: 1 }}>
                {this._renderViewToolBar()}
                {this._renderContentView()}
            </View>
        );
    }

    _renderViewToolBar(){
        return(
            <View style={{ flex: 1, backgroundColor: "#2196F3", flexDirection: "row", alignItems: "center", justifyContent: "center", height: verticalScale(50) }}>
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
                    THÔNG TIN TÀI KHOẢN{" "}
                </Text>

                <TouchableHighlight onPress={this._onPressSearch.bind(this)} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Image style={{ resizeMode: "contain", height: verticalScale(30), width: "100%" }} source={search} />
                </TouchableHighlight>
            </View>
        );
    }

    _renderContentView() {
        return <View style={{ flex: 13, backgroundColor: "#FFF"}}>           
            <View style={{
                flex: 7,
                // width: "100%",
                backgroundColor: "#FFF",
                // justifyContent: "flex-start",
                // alignItems: "flex-start",
                margin:moderateScale(10),
            }}>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: '8%' }}>
                    <View style={{ justifyContent: 'flex-start', alignItems: 'center'}}>
                        <Image style={{ height: verticalScale(5), resizeMode: 'contain', start: 0 }} source={lend} />
                    </View>
                    <Text style={{ color: "#000", fontSize: moderateScale(18), textAlign: 'left', fontWeight: 'bold' }}>THÔNG TIN TÀI KHOẢN</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: moderateScale(5),height:'5%' }}>
                    <Text style={{ color: "#000", fontSize: moderateScale(16), textAlign: 'left' }}>Họ và tên: {this.state.fullname}</Text>
                </View>
                <View style={{height:verticalScale(2),width:'100%',backgroundColor:"#CCC"}}/>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: moderateScale(5), height: '5%' }}>
                    <Text style={{ color: "#000", fontSize: moderateScale(16), textAlign: 'left' }}>Email: {this.state.email}</Text>
                </View>
                <View style={{ height: verticalScale(2), width: '100%', backgroundColor: "#CCC" }} />

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: moderateScale(5), height: '5%' }}>
                    <Text style={{ color: "#000", fontSize: moderateScale(16), textAlign: 'left' }}>Điện thoại: {this.state.numberphone}</Text>
                </View>
                <View style={{ height: verticalScale(2), width: '100%', backgroundColor: "#CCC" }} />

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: moderateScale(5), height: '5%' }}>
                    <Text style={{ color: "#000", fontSize: moderateScale(16), textAlign: 'left' }}>Địa chỉ: {this.state.address}</Text>
                </View>
                <View style={{ height: verticalScale(2), width: '100%', backgroundColor: "#CCC" }} />

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: moderateScale(5), height: '5%' }}>
                    <Text style={{ color: "#000", fontSize: moderateScale(16), textAlign: 'left' }}>Tên tài khoản: {this.state.username}</Text>
                </View>
                <View style={{ height: verticalScale(2), width: '100%', backgroundColor: "#CCC" }} />

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: moderateScale(5), height: '5%' }}>
                    <Text style={{ color: "#000", fontSize: moderateScale(16), textAlign: 'left' }}>Loại tài khoản: {global.vip? "VIP" : "Thường"}</Text>
                </View>
                <View style={{ height: verticalScale(2), width: '100%', backgroundColor: "#CCC" }} />
            </View>
        </View>;
    }

    

    _onPressBack(){
       this.props.navigation.goBack();
    }

    _onPressSearch(){
        const { navigate } = this.props.navigation;
        navigate("Search"); 
    }

    _onPressTaiLieu(){

    }

    _onPressCaNhan(){

    }

}