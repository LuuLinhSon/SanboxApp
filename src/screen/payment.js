import React, { Component } from 'react';
import {
    Text, View, Image, TouchableHighlight, ListView, TouchableOpacity, WebView, Alert,AsyncStorage
} from 'react-native';
import styles from '../style/styles';
import { textInputUserName, textInputPassword } from '../multiscreen/renderComponentOS';
import { horizoltalscale, verticalScale, moderateScale } from "../multiscreen/formula";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
const URL = "http://readbook.vietesoft.com";
import md5 from "blueimp-md5";
const ROOT_URL = "http://readbook.vietesoft.com/api/";
const CLIENT_KEY = "clientKey=676e8b1b13e894b7bc65c085d120fc25";
const SEND_TRANSACTION = ROOT_URL.concat("ApiLog/add?").concat(CLIENT_KEY).concat("&");

export default class PaymentScreen extends Component {

    constructor(props) {
        super(props);

        user = require("../icons/userfb.jpg");
        lend = require("../icons/baseline_lens_black_18dp.png");
        menu = require("../icons/baseline_menu_white_18dp.png");
        search = require("../icons/baseline_search_white_18dp.png");
        tailieunho = require("../icons/if_book_edit_35733.png");
        canhannho = require("../icons/if_system-users_15357.png");
        back = require("../icons/baseline_keyboard_arrow_left_white_18dp.png");
        check = require("../icons/check.png");
        uncheck = require("../icons/uncheck.jpg");

        data=[];
        datademo=[
          {
              "label":"Gói nạp 20: 03 ngày   20.000 VND",
              "value":1
          },
            {
                "label": "Gói nạp 50: 10 ngày   50.000 VND",
                "value": 2
            },

        ];
        list=[];
        this.state = {
            showWebview:false,
            index: 0,
            listValues: [],
            account: {},
            tokenCode: '',
            checkoutUrl: '',
            token:''
        };
        }

    componentWillMount(){
        fetch("http://readbook.vietesoft.com/api/PayAccount?clientKey=676e8b1b13e894b7bc65c085d120fc25&type=json")
          .then(response => response.json())
          .then(response => {
              console.log("PAYMENT-ACCOUNT " + response);
            if (response.status) {
              this.setState({ account: response.data[0] });
            } else {
              Alert.alert("Lỗi", response.message);
            }
          });
    }    


    componentDidMount(){
        fetch("http://readbook.vietesoft.com/api/ApiLog/listgoinap?clientKey=676e8b1b13e894b7bc65c085d120fc25&type=json")
          .then(response => response.json())
          .then(response => {
              console.log("PAYMENT-LIST " + response);
              if (response.status) {
                list = response.data;
               this.setState({ listValues: response.data });
                for (let i = 0; i < list.length; i++) {
                    data.push({
                        label: 
                        list[i].Name,
                        // + ": " +
                        // list[i].NumberDay + " ngày" + "    " + 
                        // list[i].TradeMoney + " VNĐ", 
                        value: i
                    });
                    console.log("PAYMENT LIST DATA" + JSON.stringify(data));
                }
            }
          });

        AsyncStorage.getItem('Token')
            .then((value) => {
                this.setState({
                    "token": value
                })
                console.log("token PAYMENT : " + this.state.token);
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

                <TouchableHighlight onPress={this._onPressSearch.bind(this)} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Image style={{ resizeMode: "contain", height: verticalScale(30), width: "100%" }} source={search} />
                </TouchableHighlight>
            </View>
        );
    }

    _renderContentView() {
        return <View style={{ flex: 13, backgroundColor: "#FFF" }}>
            <View style={{
                flex: 1,
                // width: "100%",
                backgroundColor: "#FFF",
                // justifyContent: "flex-start",
                // alignItems: "flex-start",
                margin: moderateScale(10),
            }}>

                {this.state.showWebview ? (
                    <WebView
                        onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                        javaScriptEnabled={true}
                        startInLoadingState={true}
                        style={{ flex: 1 }}
                        source={{ uri: this.state.checkoutUrl }}
                    />
                ) : (
                        <View style={{ flex: 1}}>
                            <View style={{flex:0.2,flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: '8%', marginBottom: verticalScale(10) }}>
                                <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Image style={{ height: verticalScale(5), resizeMode: 'contain', start: 0 }} source={lend} />
                                </View>
                                <Text style={{ color: "#000", fontSize: moderateScale(18), textAlign: 'left', fontWeight: 'bold' }}>LỰA CHỌN GÓI NẠP TIỀN</Text>
                            </View>

                            <View
                                style={{ flex: 1, justifyContent: 'flex-start', alignSelf:'flex-start'}}
                            >
                                <RadioForm
                                    radio_props={datademo}
                                    initial={0}
                                    animation={true}
                                    onPress={(value, index) => {
                                        console.log(value + " - " + index);
                                        this.setState({ index: index });
                                    }}
                                />
                            </View>
                            

                            <TouchableOpacity onPress={this._onPressPayment.bind(this)} style={{ flex: 1, margin: moderateScale(10), justifyContent: 'flex-end', alignItems: 'center', }}>
                                <View style={{ backgroundColor: '#CCC', justifyContent: 'center', alignItems: 'center', height: verticalScale(40), borderRadius: 5, width: '100%', marginBottom: verticalScale(10) }}>
                                    <Text style={{ color: '#EF6C00', fontWeight: 'bold' }}>THANH TOÁN</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
        </View>;
    }

    
    _onPressPayment(){
            let amount = this.state.listValues[this.state.index];
            let params = {};
            params.func = 'sendOrder';
            params.version = '1.0';
            // params.merchant_id = "46037";
            params.merchant_id = this.state.account.accountId;
            // params.merchant_account = 'tuanda@vietesoft.com';
            params.merchant_account = this.state.account.accountUsr;
            params.order_code = 'VES-' + this.props.navigation.getParam('callpayment').phone + '-' + amount.TradeMoney + '-' + Date.now();
            params.total_amount = amount.TradeMoney;
            params.currency = 'vnd';
            params.language = 'vi';
            params.return_url = URL;
            params.cancel_url = URL;
            params.notify_url = URL;
            params.buyer_fullname = this.props.navigation.getParam('callpayment').custname;
            params.buyer_email = this.props.navigation.getParam('callpayment').email;
            params.buyer_mobile = this.props.navigation.getParam('callpayment').phone;
            params.buyer_address = this.props.navigation.getParam('callpayment').address;
            params.checksum = md5(params.func + '|' +
                params.version + '|' +
                params.merchant_id + '|' +
                params.merchant_account + '|' +
                params.order_code + '|' +
                params.total_amount + '|' +
                params.currency + '|' +
                params.language + '|' +
                params.return_url + '|' +
                params.cancel_url + '|' +
                params.notify_url + '|' +
                params.buyer_fullname + '|' +
                params.buyer_email + '|' +
                params.buyer_mobile + '|' +
                params.buyer_address + '|'
                // + "10bc0419961046938175140221f0247b"); // Merchant_Password.
                + this.state.account.accountPsw);

            let formBody = new FormData();
            for (var property in params) {
                formBody.append(property, params[property]);
            }
        fetch("https://www.nganluong.vn/mobile_checkout_api_post.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formBody
            })
                .then((response) => { return response.json() })
                .then((response) => {
                    if (response.response_code === '00') {
                        this.setState({
                            tokenCode: response.token_code,
                            checkoutUrl: response.checkout_url,
                            showWebview: true
                        })
                    } else {
                        this._showError(response.response_code);
                    }
                })
                .done();
        
    }

    _showError(code) {
        switch (code) {
            case '01':
                Alert.alert("Lỗi", "Lỗi không xác định");
                break;
            case '04':
                Alert.alert("Lỗi", "Checksum không đúng");
                break;
            case '02':
                Alert.alert("Lỗi", "Merchant không tồn tại");
                break;
            case '05':
                Alert.alert("Lỗi", "Không ghi nhận được đơn hàng trên công thanh toán");
                break;
            case '06':
                Alert.alert("Lỗi", "Token code không tồn tại hoặc không hợp lệ");
                break;
            case '07':
                Alert.alert("Lỗi", "Đơn hàng chưa được thanh toán");
                break;
            case '09':
                Alert.alert("Lỗi", "Email người nhận không tồn tại");
                break;
            case '111':
                Alert.alert("Lỗi", "Email đang bị khoá hoặc phong toả không thể giao dịch");
                break;
            case '20':
                Alert.alert("Lỗi", "Funtion không đúng");
                break;
            case '21':
                Alert.alert("Lỗi", "Version không đúng hoặc không tồn tại");
                break;
            case '22':
                Alert.alert("Lỗi", "Thiếu tham số đầu vào");
                break;
            case '02':
                Alert.alert("Lỗi", "Merchant không tồn tại");
                break;
        }
    }
    

    _onNavigationStateChange(webViewState) {
        if (webViewState.loading) {
            // RNProgressHUB.showSpinIndeterminate();
        } else {
            // RNProgressHUB.dismiss();
        }
        if (webViewState.url.includes(URL)) {
            this.setState({
                showWebview: false
            })
            this._checkOderStatus();
        }
    }

    _checkOderStatus() {
        let params = {};
        params.func = 'checkOrder';
        params.version = '1.0';
        // params.merchant_id = "46037";
        params.merchant_id = this.state.account.accountId;
        params.token_code = this.state.tokenCode;
        params.checksum = md5(params.func + '|' +
            params.version + '|' +
            params.merchant_id + '|' +
            params.token_code + '|'
            // + "10bc0419961046938175140221f0247b");
            + this.state.account.accountPsw);
        let formBody = new FormData();
        for (var property in params) {
            formBody.append(property, params[property]);
        }
        fetch("https://www.nganluong.vn/mobile_checkout_api_post.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formBody
        })
            .then((response) => { return response.json() })
            .then((response) => {
                if (response.response_code === '00') {
                    if (response.transaction_status == '2' || response.transaction_status == '4') {
                        this._sendTransaction();
                    } else if (response.transaction_status == '1') {
                        Alert.alert("Thông báo", "Giao dịch chưa thanh toán")
                    } else {
                        Alert.alert("Thông báo", "Giao dịch lỗi");
                    }
                } else {
                    this._showError(response.response_code)
                }
            })
            .done();
    }

    _sendTransaction() {
        let amount = this.state.listValues[this.state.index];
        var queryString = objToQueryString({
            groupPay: amount.ID,
            token: this.state.token,
            typePay: 'nap qua mobile'
        })
        fetch(SEND_TRANSACTION.concat(queryString))
            .then((response) => { return response.json() })
            .then((response) => {
                if (response.status) {
                    Alert.alert("Thông báo", "Giao dịch thành công.Vui lòng đăng nhập lại!");
                    // AsyncStorage.setItem("UserUpdate", JSON.stringify(response.userInfo));
                    const { navigate } = this.props.navigation;
                    let key = ["User", "UserUpdate", "Token", "Status", "Fullname"];
                    AsyncStorage.multiRemove(key);
                    navigate("Auth");
                    global.isLogin = false;
                    global.fullname = "";
                    global.vip = false;
                    // this.props.dispatch({
                    //     type: 'LOGIN',
                    //     user: response.userInfo,
                    //     token: this.props.token
                    // });
                    // this.props.navigation.pop();
                } else {
                    Alert.alert("Lỗi", response.message);
                }
            })
            .done();
    }

    objToQueryString(obj) {
    const keyValuePairs = [];
    for (const key in obj) {
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.join('&');
    }

    _onPressBack() {
        this.props.navigation.goBack();
    }

    _onPressSearch() {
        const { navigate } = this.props.navigation;
        navigate("Search"); 
    }

    _onPress(){

    }

}