import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
  AsyncStorage,
  ScrollView
} from "react-native";


import styles from '../style/styles';
import { textInputUserName, textInputPassword } from '../multiscreen/renderComponentOS';
import { horizoltalscale, verticalScale, moderateScale } from "../multiscreen/formula";
// import RNProgressHUB from "react-native-progresshub";


export default class ChangeInfoScreen extends Component {

    constructor(props) {
        super(props);

        user = require("../icons/userfb.jpg");
        lend = require("../icons/baseline_lens_black_18dp.png");
        menu = require("../icons/baseline_menu_white_18dp.png");
        search = require("../icons/search.png");
        tailieunho = require("../icons/if_book_edit_35733.png");
        canhannho = require("../icons/if_system-users_15357.png");
        back = require("../icons/back.png");
        icon_user = require("../icons/baseline_perm_identity_black_18dp.png");
        icon_password = require("../icons/baseline_vpn_key_black_18dp.png");
        eye_on = require("../icons/baseline_visibility_black_18dp.png");
        eye_off = require("../icons/baseline_visibility_off_black_18dp.png");
        clean = require("../icons/baseline_clear_black_18dp.png");
        call = require("../icons/baseline_call_black_18dp.png");
        info = require("../icons/baseline_info_black_18dp.png");
        emails = require("../icons/baseline_email_black_18dp.png");
        city = require("../icons/baseline_business_black_18dp.png")

        this.state={
            username: "",
            fullname: "",
            password: "", 
            email: "",
            address: "",
            numberphone: "",
            token:""
        }

    }

    componentDidMount() {

        AsyncStorage.getItem('UserUpdate')
            .then((valuestr) => JSON.parse(valuestr))
            .then((data) => {
                if (data === null) {
                    AsyncStorage.getItem('User')
                        .then((valuestr) => JSON.parse(valuestr))
                        .then((data) => {
                            this.setState({
                                "username": data.data.UserName,
                                "fullname": data.data.CustName,
                                "email": data.data.Email,
                                "address": data.data.Address,
                                "numberphone": data.data.Phone,
                                "isLoading": false,
                                "vip": data.data.vip
                            });
                        });

                } else {
                    AsyncStorage.getItem('UserUpdate')
                        .then((valuestr) => JSON.parse(valuestr))
                        .then((data) => {
                            this.setState({
                                "username": data.data.UserName,
                                "fullname": data.data.CustName,
                                "email": data.data.Email,
                                "address": data.data.Address,
                                "numberphone": data.data.Phone,
                                "vip": data.data.vip
                            });
                        });
                }
            }); 

        // AsyncStorage.getItem('User')
        //     .then((valuestr) => JSON.parse(valuestr))
        //     .then((data) => {
        //         this.setState({
        //             "username": data.data.UserName,
        //             "fullname": data.data.CustName,
        //             "email": data.data.Email,
        //             "address": data.data.Address,
        //             "numberphone": data.data.Phone,
        //        });
        //     });
        AsyncStorage.getItem('Token')
            .then((value) => {
                this.setState({
                    "token" : value
                })
                console.log("token CHANGE INFO : " + this.state.token);
            })    
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

                <Text
                    style={{
                        color: "#FFF",
                        fontSize: moderateScale(15),
                        textAlign: "center",
                        flex: 8
                    }}
                >
                    {" "}
                    THAY ĐỔI THÔNG TIN CÁ NHÂN{" "}
                </Text>

                <TouchableOpacity onPress={this._onPressSearch.bind(this)} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Image style={{ resizeMode: "contain", height: verticalScale(30), width: "100%" }} source={search} />
                </TouchableOpacity>
            </View>
        );
    }

    _renderContentView() {
        return <View style={{ flex: 13, backgroundColor: "#FFF" }}>
            <View style={{
                flex: 12,
                // width: "100%",
                backgroundColor: "#FFF",
                justifyContent: "center",
                alignItems: "center",
                margin: moderateScale(10),
            }}>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: verticalScale(10) }}>
                    <Text style={{ color: "#000", fontSize: moderateScale(18), textAlign: 'left', fontWeight: 'bold', color:'#2196F3' }}>THAY ĐỔI THÔNG TIN CÁ NHÂN</Text>
                </View>

                {/* <ScrollView style={{ flex: 1,width:'100%'}}> */}
                <View style={styles.viewlogin}>

                    <View style={styles.row}>
                        <Image source={icon_user} resizeMode="cover" style={styles.backdrop} />
                        <View style={styles.line} />
                        {this._textInputUserName()}
                        <Image source={clean} resizeMode="cover" style={styles.backdrop} />
                    </View>

                    <View style={styles.row}>
                        <Image source={info} resizeMode="cover" style={styles.backdrop} />
                        <View style={styles.line} />
                        {this._textInputFullName()}
                        <Image source={clean} resizeMode="cover" style={styles.backdrop} />
                    </View>

                    <View style={styles.row}>
                        <Image source={emails} resizeMode="cover" style={styles.backdrop} />
                        <View style={styles.line} />
                        {this._textInputEmail()}
                        <Image source={clean} resizeMode="cover" style={styles.backdrop} />
                    </View>

                    <View style={styles.row}>
                        <Image source={city} resizeMode="cover" style={styles.backdrop} />
                        <View style={styles.line} />
                        {this._textInputAddress()}
                        <Image source={clean} resizeMode="cover" style={styles.backdrop} />
                    </View>

                    <View style={styles.row}>
                        <Image source={call} resizeMode="cover" style={styles.backdrop} />
                        <View style={styles.line} />
                        {this._textInputPhone()}
                        <Image source={clean} resizeMode="cover" style={styles.backdrop} />
                    </View>

                </View>
                {/* </ScrollView> */}

            </View>
            <View style={{ flex: 1, margin: moderateScale(10), justifyContent: 'flex-end', alignItems: 'center', }}>
                <TouchableOpacity onPress={this._onPress.bind(this)} style={{ backgroundColor: '#2196F3', justifyContent: 'center', alignItems: 'center', height: verticalScale(40), borderRadius: 5, width: '100%', marginBottom: verticalScale(10) }}>
                    <View>
                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>XÁC NHẬN</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>;
    }

    _textInputUserName() {
        if (Platform.OS === "android") {
            return <TextInput onChangeText={(value) => this.setState({ username: value })} style={styles.textinput} placeholder={this.state.username} placeholderTextColor="#000000" underlineColorAndroid="transparent" />;
        } else {
            return <TextInput onChangeText={value => this.setState({
                password: value
            })} style={styles.textinput} placeholder={this.state.username} placeholderTextColor="#000000" />;
        }
    }

    _textInputFullName() {
        if (Platform.OS === "android") {
            return <TextInput onChangeText={(value) => this.setState({ fullname: value })} style={styles.textinput} placeholder={this.state.fullname} placeholderTextColor="#000000" underlineColorAndroid="transparent" />;
        } else {
            return <TextInput onChangeText={value => this.setState({
                password: value
            })} style={styles.textinput} placeholder={this.state.fullname} placeholderTextColor="#000000" />;
        }
    }

    _textInputEmail() {
        if (Platform.OS === "android") {
            return <TextInput onChangeText={(value) => this.setState({ email: value })} style={styles.textinput} placeholder={this.state.email} placeholderTextColor="#000000" underlineColorAndroid="transparent" />;
        } else {
            return <TextInput onChangeText={value => this.setState({
                password: value
            })} style={styles.textinput} placeholder={this.state.email} placeholderTextColor="#000000" />;
        }
    }

    _textInputAddress() {
        if (Platform.OS === "android") {
            return <TextInput onChangeText={(value) => this.setState({ address: value })} style={styles.textinput} placeholder={this.state.address} placeholderTextColor="#000000" underlineColorAndroid="transparent" />;
        } else {
            return <TextInput onChangeText={value => this.setState({
                password: value
            })} style={styles.textinput} placeholder={this.state.address} placeholderTextColor="#000000" />;
        }
    }

    _textInputPhone() {
        if (Platform.OS === "android") {
            return <TextInput onChangeText={(value) => this.setState({ numberphone: value })} style={styles.textinput} placeholder={this.state.numberphone} placeholderTextColor="#000000" underlineColorAndroid="transparent" />;
        } else {
            return <TextInput onChangeText={value => this.setState({
                password: value
            })} style={styles.textinput} placeholder={this.state.numberphone} placeholderTextColor="#000000" />;
        }
    }

    _onPressBack() {
        this.props.navigation.goBack();
    }

    _onPressSearch() {
        const { navigate } = this.props.navigation;
        navigate("Search"); 
    }


    _onPress() {
        // RNProgressHUB.showSpinIndeterminate();
        console.log("Token lấy ra ở ChangeInfo : " + this.state.token)
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

        try {
            fetch(
              "http://readbook.vietesoft.com/api/account/Edit?clientKey=676e8b1b13e894b7bc65c085d120fc25&token=" + this.state.token,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
              }
            )
              .then(function(response) {
                return response.json();
              })
              .then(function(resdata) {
                //   RNProgressHUB.dismiss();
                  console.log("ChangeInfo" + JSON.stringify(resdata));
                if (resdata.status === true) {
                

                alert("Thay đổi thông tin thành công!Vui lòng đăng nhập lại!")
                let key = ["User", "UserUpdate", "Token","Status","Fullname","Vip"];
                AsyncStorage.multiRemove(key);
                navigate("Auth");
                global.isLogin = false;
                global.fullname = "";
                global.vip = false;
                } else {
                  alert("Lỗi!!!Vui lòng thử lại");
                }
              });
        } catch (error) {
            console.log(error);
            throw error;
        }

    }

}