import React, { Component } from 'react';
import {
    Text, View, Image, TouchableHighlight, AsyncStorage, TouchableOpacity
} from 'react-native';
import styles from "../style/styles";
import {
  textInputUserName,
  textInputPassword
} from "../multiscreen/renderComponentOS";
import { horizoltalscale, verticalScale, moderateScale } from "../multiscreen/formula";
export default class PersonalScreen extends Component {

    constructor(props) {
        super(props);

        tokenCliend="";
        codepage=0;

        user = require("../icons/userfb.jpg");
        lend = require("../icons/baseline_lens_black_18dp.png");
        menu = require("../icons/menu.png");
        search = require("../icons/search.png");
        tailieunho = require("../icons/if_book_edit_35733.png");
        canhannho = require("../icons/if_system-users_15357.png");

        this.state = {
            username: "",
            fullname: "",
            email:"",
            phone:"",
            address:"",
            isLoading: true,
            vip:false,
            token:""
        }

    }

    componentWillMount(){
        // if(global.isLogin === false){
        //     const { navigate } = this.props.navigation;
        //     let key = ["User", "UserUpdate", "Token", "Status", "Fullname", "Vip"];
        //     AsyncStorage.multiRemove(key);
        //     navigate("Auth");
        //     global.isLogin = false;
        //     global.fullname = "";
        //     global.vip = false;
        // }
    }

    componentDidMount() {
        AsyncStorage.getItem('UserUpdate')
            .then((valuestr) => JSON.parse(valuestr))
            .then((data) => {
                if (data === null) {
                    AsyncStorage.getItem('User')
                        .then((valuestr) => JSON.parse(valuestr))
                        .then((data) => {
                            global.vip = data.data.vip;
                            this.setState({
                                "username": data.data.UserName,
                                "fullname": data.data.CustName,
                                "email": data.data.Email,
                                "phone":data.data.Phone,
                                "address":data.data.Address,
                                "isLoading":false,
                                // "vip": data.data.vip,
                                "token": data.token,
                            });
                            console.log("Lấy token trong Personal : " + data.token);
                            AsyncStorage.setItem("Token", data.token);
                            global.token = data.token;
                        });
                    
                } else {
                    AsyncStorage.getItem('UserUpdate')
                        .then((valuestr) => JSON.parse(valuestr))
                        .then((data) => {
                            global.vip = data.data.vip;
                            this.setState({
                                "username": data.data.UserName,
                                "fullname": data.data.CustName,
                                // "vip": data.data.vip,
                                "email": data.data.Email,
                                "phone": data.data.Phone,
                                "address": data.data.Address,
                            });
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
            <View onPress={this._onPressMenu.bind(this)} style={{ flex: 1, backgroundColor: "#2196F3", flexDirection: "row", alignItems: "center", justifyContent: "center", height: verticalScale(50) }}>
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
                    CÁ NHÂN{" "}
                </Text>

                <TouchableOpacity onPress={this._onPressSearch.bind(this)} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Image style={{ resizeMode: "contain", height: verticalScale(30), width: "100%" }} source={search} />
                </TouchableOpacity>
            </View>
        );
    }


    _renderViewHeader() {
            if (this.props.navigation.state.params) {
                return (
                        <TouchableOpacity
                            onPress={this._onPressHeader.bind(this)}
                            style={{ flexDirection: "row", flex: 1, width: "100%", backgroundColor: "#CCC", justifyContent: "center", alignItems: "center" }}
                           >
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Image style={{ resizeMode: "contain", height: verticalScale(50), borderRadius: 30 }} source={user} />
                        </View>

                        <View style={{ flex: 3 }}>
                            <View style={{ flex: 1, justifyContent: "flex-end", alignSelf: "flex-start", marginBottom: 3 }}>
                                <Text style={{ fontSize: 15, color: "#2196F3" }}>
                                    {this.props.navigation.state.params.call.name} - {this.props.navigation.state.params.call.fullname}
                                </Text>
                            </View>

                            <View style={{ flex: 1, backgroundColor: "#CCC", flexDirection: "row", justifyContent: "flex-start", alignSelf: "flex-start", marginTop: verticalScale(3) }}>
                                <Text
                                    style={{

                                        color: "#000",
                                        fontSize: moderateScale(15),
                                        textAlign: "center"
                                    }}
                                >
                                    Trang cá nhân của bạn
                        </Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                    );
            }else{
                return (
                        <TouchableOpacity
                            onPress={this._onPressHeader.bind(this)}
                            style={{ flexDirection: "row", flex: 1, width: "100%", backgroundColor: "#CCC", justifyContent: "center", alignItems: "center" }}
                           >
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Image style={{ resizeMode: "contain", height: verticalScale(50), borderRadius: 30 }} source={user} />
                        </View>

                        <View style={{ flex: 3 }}>
                            <View style={{ flex: 1, justifyContent: "flex-end", alignSelf: "flex-start", marginBottom: 3 }}>
                                <Text style={{ fontSize: 15, color: "#2196F3" }}>
                                    {this.state.username} - {this.state.fullname}
                                </Text>
                            </View>

                            <View style={{ flex: 1, backgroundColor: "#CCC", flexDirection: "row", justifyContent: "flex-start", alignSelf: "flex-start", marginTop: verticalScale(3) }}>
                                <Text
                                    style={{

                                        color: "#000",
                                        fontSize: moderateScale(15),
                                        textAlign: "center"
                                    }}
                                >
                                    Trang cá nhân của bạn
                        </Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                    );
                }
        
    }

    _renderContentView() {
        return <View style={{ flex: 13, backgroundColor: "#FFF" }}>

            {this._renderViewHeader()}

            <View style={{
                flex: 7,
                // width: "100%",
                backgroundColor: "#FFF",
                // justifyContent: "flex-start",
                // alignItems: "flex-start",
                margin: moderateScale(10),

            }}>
                <TouchableOpacity onPress={this._onPressPayment.bind(this)} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: 5, height: '5%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: moderateScale(5), height: '5%' }}>
                    <Image style={{ height: verticalScale(5), resizeMode: 'contain', }} source={lend} />
                    <Text style={{ color: "#000", fontSize: moderateScale(16), textAlign: 'left' }}>Nạp tiền</Text>
                </View>
                </TouchableOpacity>
                <View style={{ height: verticalScale(2), width: '100%', backgroundColor: "#CCC" }} />

                <TouchableOpacity onPress={this._onPressHistoryPayment.bind(this)} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: 5, height: '5%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: moderateScale(5), height: '5%' }}>
                    <Image style={{ height: verticalScale(5), resizeMode: 'contain', }} source={lend} />
                    <Text style={{ color: "#000", fontSize: moderateScale(16), textAlign: 'left' }}>Lịch sử giao dịch</Text>
                </View>
                </TouchableOpacity>
                <View style={{ height: verticalScale(2), width: '100%', backgroundColor: "#CCC" }} />

                <TouchableOpacity onPress={this._onPressChangeInfo.bind(this)} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: 5, height: '5%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: moderateScale(5), height: '5%' }}>
                        <Image style={{ height: verticalScale(5), resizeMode: 'contain', }} source={lend} />
                        <Text style={{ color: "#000", fontSize: moderateScale(16), textAlign: 'left' }}>Thay đổi thông tin cá nhân</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ height: verticalScale(2), width: '100%', backgroundColor: "#CCC" }} />

                <TouchableOpacity onPress={this._onPressChangePassword.bind(this)} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: 5, height: '5%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: moderateScale(5), height: '5%' }}>
                    <Image style={{ height: verticalScale(5), resizeMode: 'contain', }} source={lend} />
                    <Text style={{ color: "#000", fontSize: moderateScale(16), textAlign: 'left' }}>Thay đổi mật khẩu</Text>
                </View>
                </TouchableOpacity>
                <View style={{ height: verticalScale(2), width: '100%', backgroundColor: "#CCC" }} />
                   
                <TouchableOpacity onPress={this._onPressSignOut.bind(this)} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: 5, height: '5%' }}>   
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: moderateScale(5), height: '5%' }}>
                    <Image style={{ height: verticalScale(5), resizeMode: 'contain', }} source={lend} />
                    <Text style={{ color: "red", fontSize: moderateScale(16), textAlign: 'left' }}>Đăng xuất</Text>
                </View>
                </TouchableOpacity>
                <View style={{ height: verticalScale(2), width: '100%', backgroundColor: "#CCC" }} />
            </View>
        </View>;
    }


    _onPressSignOut(){
        const { navigate } = this.props.navigation;
        let key = ["User", "UserUpdate", "Token","Status","Fullname","Vip"];
        AsyncStorage.multiRemove(key);
        navigate("Auth");
        global.isLogin = false;
        global.fullname = "";
        global.vip = false;
    }

    _onPressSearch() {
        const { navigate } = this.props.navigation;
        navigate("Search"); 
    }

    _onPressHeader() {
        this.props.navigation.navigate("PersonalDetail");
    }

    _onPressMenu() {
        this.props.navigation.openDrawer();
    }

    _onPressChangeInfo() {
        this.props.navigation.navigate("ChangeInfo");
    }

    _onPressChangePassword(){
        this.props.navigation.navigate("ChangePassword");
    }

    _onPressPayment(){
        this.props.navigation.navigate("Payment",{callpayment:{custname:this.state.fullname,email:this.state.email,
            phone:this.state.phone,address:this.state.address}});
    }

    _onPressHistoryPayment(){
        this.props.navigation.navigate("HistoryPayment",{callhistory:this.state.token});
        console.log("TOKEN IN PERSONAL" + this.state.token);
    }
}