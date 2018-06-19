import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    TextInput,
    TouchableHighlight,
    AsyncStorage,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import styles from '../style/styles';
import { textInputUserName, textInputPassword } from '../multiscreen/renderComponentOS';
import { horizoltalscale, verticalScale, moderateScale } from "../multiscreen/formula";
// import RNProgressHUB from "react-native-progresshub";

export default class SignInScreen extends Component {
    constructor(props) {
        super(props);
        icon_user = require("../icons/baseline_perm_identity_black_18dp.png");
        icon_password = require("../icons/baseline_vpn_key_black_18dp.png");
        eye_on = require("../icons/eye.png");
        eye_off = require("../icons/no_eye.png");
        clean = require("../icons/baseline_clear_black_18dp.png");
        tailieunho = require("../icons/if_book_edit_35733.png");
        canhannho = require("../icons/if_system-users_15357.png");
        menu = require("../icons/menu.png");
        search = require("../icons/search.png");
        this.state = {
            username: "",
            password: "",
            hidePassword:true
        }
    }

      _onPress() {

        const { navigate } = this.props.navigation;

        var data = {
          "UserName": this.state.username,
          "Password": this.state.password,
        }

        // RNProgressHUB.showSpinIndeterminate();

        try {
          fetch(
            "http://readbook.vietesoft.com/api/account/add?clientKey=676e8b1b13e894b7bc65c085d120fc25&usr=" + this.state.username + 
            "&psw=" + this.state.password + "&type=json"
          )
            .then(function (response) {
              return response.json();
            })
            .then(function (resdata) {
              console.log("SignIn" + JSON.stringify(resdata));
              if (resdata.status === true) {
                
                try {
                  // RNProgressHUB.dismiss();
                  AsyncStorage.setItem('User', JSON.stringify(resdata));
                  navigate("App");
                  global.isLogin = true;
                  global.fullname = resdata.data.CustName;
                  global.vip = resdata.data.vip;
                  console.log("SignIn VIP : " + resdata.data.vip);
                  AsyncStorage.setItem('Status',"yes");
                  AsyncStorage.setItem('Fullname',global.fullname);
                  if(resdata.data.vip === true){
                    AsyncStorage.setItem('Vip', "yes");
                  }else{
                    AsyncStorage.setItem("Vip", "no");
                  }
                  
                } catch (error) {
                  console.log(error);
                  throw error;
                }
              } else {
                alert("Đăng nhập thất bại.Vui lòng thử lại");
              }
            });
        } catch (error) {
          console.log(error);
          throw error;
        }

      }
    

    render() {
        return <View style={{flex:1,backgroundColor:"#FFF"}}>

            <View style={{ flex:1,backgroundColor: "#2196F3", flexDirection: "row", alignItems: "center", justifyContent: "center", height: verticalScale(50) }}>
                <TouchableOpacity onPress={this._onPressMenu.bind(this)} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                  <Image style={{ resizeMode: "contain", height: verticalScale(30), width: "100%" }} source={menu} />
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
                  TEST FOR SERVANTS{" "}
                </Text>

                <TouchableOpacity onPress={this._onPressSearch.bind(this)} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                  <Image style={{ resizeMode: "contain", height: verticalScale(30), width: "100%" }} source={search} />
                </TouchableOpacity>
              </View>

            
          <View style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flex: 13,
            margin: moderateScale(20)
          }}>
              <Text style={styles.textdangnhap}>ĐĂNG NHẬP</Text>
 
            {/* <ScrollView style={{flex:1,width:'100%'}}> */}

              <View style={styles.viewlogin}>
                <View style={styles.row}>
                  <Image source={icon_user} resizeMode="cover" style={styles.backdrop} />
                  <View style={styles.line} />
                  {textInputUserName(this)}
                  <TouchableOpacity onPress={this._onPressClearName.bind(this)} style={styles.backdrop}>
                     <Image source={clean} resizeMode="cover" style={styles.backdrop} />
                  </TouchableOpacity>
                </View>

                <View style={styles.row}>
                  <Image source={icon_password} resizeMode="cover" style={styles.backdrop} />
                  <View style={styles.line} />
                  {textInputPassword(this)}
                  <TouchableOpacity onPress={this._onPressHidePass.bind(this)} style={styles.backdrop}>
                  {this.state.hidePassword? ( 
                    <Image source={eye_off} resizeMode="cover" style={{
                      flex: 30,
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      resizeMode: "contain",
                      height: verticalScale(20),
                      width: horizoltalscale(20)
                    }} />
                  ):(
                      <Image source={eye_on} resizeMode="cover" style={{
                        flex: 30,
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        resizeMode: "contain",
                        height: verticalScale(20),
                        width: horizoltalscale(20)
                      }} />
                  )}
                  
                  </TouchableOpacity>
                </View>

                <TouchableHighlight style={{ marginTop: verticalScale(20) }} onPress={this._onPress.bind(this)}>
                  <Text style={styles.textlogin}>Đăng nhập</Text>
                </TouchableHighlight>

                <View style={styles.rowdangkymoi}>
                  <Text onPress={this._onPressRegister.bind(this)} style={styles.textconnectwith}>
                    Đăng ký ngay!
                  </Text>
                  <Text onPress={this._onPressReminder.bind(this)} style={styles.textconnectwith}>
                    Quên mật khẩu?
                  </Text>
                </View>

              </View>
            
            {/* </ScrollView> */}
              
            </View>
          </View>;
    }

    _onPressRegister(){
      this.props.navigation.navigate("SignUp");
    }

    _onPressReminder(){
      this.props.navigation.navigate("Reminder");
    }

    _onPressMenu(){
      this.props.navigation.openDrawer();
    }

    _onPressSearch(){
      const { navigate } = this.props.navigation;
        navigate("Search");
    }

    _onPressClearName(){
      this.textInput.clear();
    }

    _onPressHidePass(){
      this.setState({
         hidePassword:!this.state.hidePassword
      });
    }

    
}