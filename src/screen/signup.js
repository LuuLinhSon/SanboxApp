import React, { Component } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  ScrollView,
  TouchableOpacity
} from "react-native";
import styles from '../style/styles';
import {
  textInputUserName,
  textInputPassword,
  textInputFullName, 
  textInputEmail,
   textInputNumberPhone
} from "../multiscreen/renderComponentOS";
import { horizoltalscale, verticalScale, moderateScale } from "../multiscreen/formula";
// import RNProgressHUB from "react-native-progresshub";

export default class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        icon_user = require("../icons/baseline_perm_identity_black_18dp.png");
        icon_password = require("../icons/baseline_vpn_key_black_18dp.png");
        eye_on = require("../icons/eye.png");
        eye_off = require("../icons/no_eye.png");
        clean = require("../icons/baseline_clear_black_18dp.png");
        call = require("../icons/baseline_call_black_18dp.png");
        info = require("../icons/baseline_info_black_18dp.png");
        emails = require("../icons/baseline_email_black_18dp.png");
        tailieunho = require("../icons/if_book_edit_35733.png");
        canhannho = require("../icons/if_system-users_15357.png");
        search = require("../icons/search.png");
        back = require("../icons/back.png");

        this.state = {
            username: "",
            password: "",
            fullname: "",
            email: "",
            numberphone: "",
            address: "",
            birthday: "",
            hidePassword:true
        }
    }

    _onPress() {
        // RNProgressHUB.showSpinIndeterminate();

        const { navigate } = this.props.navigation;

        var data = {
            "UserName": this.state.username,
            "Password": this.state.password,
            "CustName": this.state.fullname,
            "Address": this.state.address,
            "Phone": this.state.numberphone,
            "Email": this.state.email,
            "Birthday": this.state.birthday

        }
        if (this.state.username !== "" && this.state.password !== "" && this.state.fullname !== "" && 
        this.state.numberphone !== "" && this.state.email !== ""){
            try {
                fetch(
                    "http://readbook.vietesoft.com/api/account/add?clientKey=676e8b1b13e894b7bc65c085d120fc25",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    }
                )
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (resdata) {
                        // RNProgressHUB.dismiss();
                        console.log(resdata);
                        if (resdata.status === true) {
                            try {
                                AsyncStorage.setItem('User', JSON.stringify(resdata));
                                navigate("App");
                                global.isLogin = true;
                                global.fullname = resdata.data.CustName;
                                global.vip = resdata.data.vip;
                                AsyncStorage.setItem('Status', "yes");
                                AsyncStorage.setItem('Fullname', global.fullname);
                                if (resdata.data.vip === true) {
                                    AsyncStorage.setItem('Vip', "yes");
                                } else {
                                    AsyncStorage.setItem("Vip", "no");
                                }
                            } catch (error) {
                                console.log(error);
                                throw error;
                            }

                        } else {
                            alert("Đăng ký thất bại.Vui lòng thử lại");
                        }
                    });
            } catch (error) {
                console.log(error);
                throw error;
            }
        }else{
            alert("Vui lòng điền đầy đủ các trường");
        }
        
    }

    render() {
        return <View style={{ flex: 1, backgroundColor: "#FFF" }}>
            <View style={{ flex: 1, backgroundColor: "#2196F3", flexDirection: "row", alignItems: "center", justifyContent: "center", height: verticalScale(50) }}>
              <TouchableOpacity onPress={this._onPressBack.bind(this)} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Image style={{ resizeMode: "contain", height: verticalScale(30), width: "100%" }} source={back} />
              </TouchableOpacity>

              <Text style={{ color: "#FFF", fontSize: moderateScale(15), textAlign: "center", flex: 8 }}>
                {" "}
                TEST FOR SERVANTS{" "}
              </Text>

              <TouchableOpacity onPress={this._onPressSearch.bind(this)} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Image style={{ resizeMode: "contain", height: verticalScale(30), width: "100%" }} source={search} />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", flex: 13, margin: moderateScale(20) }}>
                <Text style={styles.textdangnhap}>ĐĂNG KÝ TÀI KHOẢN</Text>

              {/* <ScrollView style={{ flex: 1,width:'100%'}}> */}
              <View style={styles.viewlogin}>
                <View style={styles.row}>
                  <Image source={icon_user} resizeMode="cover" style={styles.backdrop} />
                  <View style={styles.line} />
                  {textInputUserName(this)}
                  <View style={styles.backdrop} />
                </View>

                <View style={styles.row}>
                  <Image source={icon_password} resizeMode="cover" style={styles.backdrop} />
                  <View style={styles.line} />
                  {textInputPassword(this)}
                  <TouchableOpacity onPress={this._onPressHidePass.bind(this)} style={styles.backdrop}>
                    {this.state.hidePassword ? <Image source={eye_off} resizeMode="cover" style={{ flex: 30, flexDirection: "column", justifyContent: "center", alignItems: "center", resizeMode: "contain", height: verticalScale(20), width: horizoltalscale(20) }} /> : <Image source={eye_on} resizeMode="cover" style={{ flex: 30, flexDirection: "column", justifyContent: "center", alignItems: "center", resizeMode: "contain", height: verticalScale(20), width: horizoltalscale(20) }} />}
                  </TouchableOpacity>
                </View>

                <View style={styles.row}>
                  <Image source={info} resizeMode="cover" style={styles.backdrop} />
                  <View style={styles.line} />
                  {textInputFullName(this)}
                  <View style={styles.backdrop} />
                </View>

                <View style={styles.row}>
                  <Image source={emails} resizeMode="cover" style={styles.backdrop} />
                  <View style={styles.line} />
                  {textInputEmail(this)}
                  <View style={styles.backdrop} />
                </View>

                <View style={styles.row}>
                  <Image source={call} resizeMode="cover" style={styles.backdrop} />
                  <View style={styles.line} />
                  {textInputNumberPhone(this)}
                  <View style={styles.backdrop} />
                </View>

                <TouchableOpacity style={{ marginTop: verticalScale(20) }} onPress={this._onPress.bind(this)}>
                  <Text style={styles.textlogin}>Đăng ký</Text>
                </TouchableOpacity>
              </View>
              {/* </ScrollView> */}
            </View>
          </View>;
    }

    _onPressBack() {
        this.props.navigation.goBack();
    }

    _onPressSearch(){
        const { navigate } = this.props.navigation;
        navigate("Search");
    }

    _onPressHidePass(){
        this.setState({
            hidePassword: !this.state.hidePassword
        });
    }

}