import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollView
} from "react-native";
import styles from '../style/styles';
import { textInputUserName, textInputPassword,textInputEmail } from '../multiscreen/renderComponentOS';
import { horizoltalscale, verticalScale, moderateScale } from "../multiscreen/formula";
// import RNProgressHUB from "react-native-progresshub";

export default class ReminderScreen extends Component {
    constructor(props) {
        super(props);
        icon_user = require("../icons/baseline_perm_identity_black_18dp.png");
        icon_password = require("../icons/baseline_vpn_key_black_18dp.png");
        emails = require("../icons/baseline_email_black_18dp.png");
        eye_on = require("../icons/baseline_visibility_black_18dp.png");
        eye_off = require("../icons/baseline_visibility_off_black_18dp.png");
        clean = require("../icons/baseline_clear_black_18dp.png");
        tailieunho = require("../icons/if_book_edit_35733.png");
        canhannho = require("../icons/if_system-users_15357.png");
        back = require("../icons/baseline_keyboard_arrow_left_white_18dp.png");
        search = require("../icons/baseline_search_white_18dp.png");
        this.state = {
            username: "",
            email: "",
        }
    }

    

    render() {
        return <View style={{flex:1,backgroundColor:"#FFF"}}>

            <View style={{flex:1, backgroundColor: "#2196F3", flexDirection: "row", alignItems: "center", justifyContent: "center", height: verticalScale(50) }}>
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
                    QUÊN MẬT KHẨU{" "}
                </Text>

                <TouchableHighlight onPress={this._onPressSearch.bind(this)} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Image style={{ resizeMode: "contain", height: verticalScale(30), width: "100%" }} source={search} />
                </TouchableHighlight>
            </View>


            <View style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                flex: 13,
                margin: moderateScale(20)
            }}>
                <Text style={styles.textdangnhap}>LẤY LẠI MẬT KHẨU</Text>

                {/* <ScrollView style={{ flex: 1,width:'100%' }}> */}
                <View style={styles.viewlogin}>
                    <View style={styles.row}>
                        <Image source={icon_user} resizeMode="cover" style={styles.backdrop} />
                        <View style={styles.line} />
                        {textInputUserName(this)}
                        <Image source={clean} resizeMode="cover" style={styles.backdrop} />
                    </View>

                    <View style={styles.row}>
                        <Image source={emails} resizeMode="cover" style={styles.backdrop} />
                        <View style={styles.line} />
                        {textInputEmail(this)}
                        <Image source={eye_off} resizeMode="cover" style={styles.backdrop} />
                    </View>

                    <TouchableHighlight style={{ marginTop: verticalScale(20) }} onPress={this._onPress.bind(this)}>
                        <Text style={styles.textlogin}>XÁC NHẬN</Text>
                    </TouchableHighlight>

                </View>
                {/* </ScrollView> */}
            </View>
        </View>;
    }

    _onPress() {
        // RNProgressHUB.showSpinIndeterminate();
        
        const { navigate } = this.props.navigation;

        try {
            fetch(
                "http://readbook.vietesoft.com/api/account/add?clientKey=676e8b1b13e894b7bc65c085d120fc25&usr=" + this.state.username +
                "&email=" + this.state.email
            )
                .then((response)=> response.json())
                .then((resdata)=>{
                    // RNProgressHUB.dismiss();
                    console.log("SignIn" + JSON.stringify(resdata));
                    if (resdata.status === true) {
                        alert(resdata.message);
                        navigate("SignIn");
                    } else {
                        alert("Lỗi!Vui lòng thử lại");
                    }
                });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    _onPressBack() {
        this.props.navigation.goBack();
    }

    _back() {
        // const { params } = this.props.navigation.state;
        // const { goBack } = this.props.navigation;
        // params.callLogin();
        // goBack();
    }

    _onPressSearch(){
        const { navigate } = this.props.navigation;
        navigate("Search");
    }

}