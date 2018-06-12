import React, { Component } from 'react';
import {
    Text, View, Image, AsyncStorage, TouchableOpacity, ListView,
} from 'react-native';
import {
    horizoltalscale,
    verticalScale,
    moderateScale
} from "../multiscreen/formula";
import { DrawerActions } from "react-navigation";

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class Menu extends Component {

    constructor(props) {
        super(props);

        user = require("../icons/userfb.jpg");
        lend = require("../icons/baseline_lens_black_18dp.png");

        data= [];

        this.state = {
            // isLogin: false,
            // username:"",
            // fullname: "",
            dataSource: ds.cloneWithRows(data),
        };
    }

    componentDidMount() {

        const { navigate } = this.props.navigation;

        try {
            fetch("http://readbook.vietesoft.com/api/ApiGetData?clientKey=676e8b1b13e894b7bc65c085d120fc25&token=6372f6d26d318a17348c3a383a03623f&type=json")
                .then(response => response.json())
                .then(resdata => {

                    if (resdata.status === true) {
                        data = resdata.data.lstCate;
                        console.log("MENU " + JSON.stringify(data));
                        this.setState({
                            dataSource: ds.cloneWithRows(data),
                        });
                    } else {
                        alert("Lỗi không tải được dữ liệu");
                    }
                });
        } catch (error) {
            console.log(error);
            throw error;
        }
        
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                {this._renderDrawerView()}
            </View>
        );
    }


    _renderViewHeader() {
        if (global.isLogin === false) {
            return <View style={{ flexDirection: "row", flex: 1, width: "100%", backgroundColor: "#CCC", justifyContent: "center", alignItems: "center" }}>
                <Image style={{ flex: 1, resizeMode: "contain", height:verticalScale(60) , borderRadius: verticalScale(30) }} source={user} />

                <View style={{ flex: 2, flexDirection: "row" }}>
                        <TouchableOpacity onPress={this._onPressTextSignIn.bind(this)}>
                          <Text style={{ color: "#000", fontSize: moderateScale(15), textAlign: "center" }}>
                          Đăng nhập
                         </Text>
                        </TouchableOpacity>
                        

                        <View style={{ width: 1, height: verticalScale(15), backgroundColor: "#000", margin: moderateScale(4) }} />

                        <TouchableOpacity onPress={this._onPressTextSignUp.bind(this)}>
                          <Text style={{ color: "#000", fontSize: moderateScale(15), textAlign: "center" }}>
                          Đăng ký
                         </Text>
                        </TouchableOpacity>
                </View>
            </View>;
        } else {
            return <View style={{ flexDirection: "row", flex: 1, width: "100%", backgroundColor: "#CCC", justifyContent: "center", alignItems: "center" }}>
                <Image style={{ flex: 1, resizeMode: "contain", height: verticalScale(60), borderRadius:verticalScale(30)  }} source={user} />

                <View style={{ flex: 2 }}>
                    <View style={{ flex: 1, justifyContent: "flex-end", alignSelf: "flex-start", marginBottom: verticalScale(3) }}>
                        <Text style={{ fontSize: moderateScale(15), color: "#2196F3" }}>
                            Xin chào: {global.fullname}
                        </Text>
                    </View>

                    <View style={{ flex: 1, backgroundColor: "#CCC", flexDirection: "row", justifyContent: "flex-start", alignSelf: "flex-start", marginTop: verticalScale(3) }}>
                        <TouchableOpacity onPress={this._onPressTextInfo.bind(this)}>
                            <Text
                            style={{
                                color: "#000",
                                fontSize: moderateScale(15),
                                textAlign: "center"
                            }}
                        >
                            Thông tin
                            </Text>
                        </TouchableOpacity>
                        <View style={{ width: 1, height: verticalScale(20), backgroundColor: "#000", marginLeft: horizoltalscale(5), marginRight: horizoltalscale(5), }} />
                        <TouchableOpacity onPress={this._onPressTextPayment.bind(this)}>
                            <Text
                            style={{

                                color: "#000",
                                fontSize: moderateScale(15),
                                textAlign: "center"
                            }}
                             >
                            Nạp tiền
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>;
        }
    }

    _renderDrawerView() {
        return <View style={{ flex: 1, backgroundColor: "#FFF" }}>

            {this._renderViewHeader()}
            <Text
                style={{ color: "#2196F3", fontSize: moderateScale(17), textAlign: "center", marginTop: verticalScale(5) }}
            >
                DANH MỤC KHO TÀI LIỆU
        </Text>

            <View style={{
                flex: 7,
                width: "100%",
                backgroundColor: "#FFF",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    // renderSeparator={this._renderSeparator.bind(this)}
                    style={{flex:1,width:'100%'}}
                    enableEmptySections={true}
                    renderSeparator={(sectionID, rowID, adjacentRowHighlighted)=>{
                        return (
                            <View
                                key={sectionID + " - " + rowID}
                                style={{ height: verticalScale(2), width: "100%", backgroundColor: "#CCC" }}>
                            </View>
                        );
                    }}
                    
                />
            </View>
        </View>;
    }


    _onPressTextSignIn(){
        this.props.navigation.navigate("SignIn");
        this.props.navigation.dispatch(DrawerActions.closeDrawer());
    }

    _onPressTextSignUp(){
        this.props.navigation.navigate("SignUp");
        this.props.navigation.dispatch(DrawerActions.closeDrawer());
    }

    _onPressTextInfo(){
        this.props.navigation.navigate("PersonalDetail");
        this.props.navigation.dispatch(DrawerActions.closeDrawer());
    }

    _onPressTextPayment(){
        this.props.navigation.navigate("Payment");
        this.props.navigation.dispatch(DrawerActions.closeDrawer());
    }

    _renderRow(datasource){
        return <TouchableOpacity
            onPress={() => {
                this.props.navigation.navigate("List", { call: datasource.ID });   
                this.props.navigation.dispatch(DrawerActions.closeDrawer());
            }}
            style={{ flex: 1, justifyContent: "center", alignItems: "center", height: verticalScale(40), width: "100%" }}>
            <View style={{ flex: 100, flexDirection: "row", height: verticalScale(40), width: "100%", backgroundColor: "#FFF", margin: moderateScale(3), justifyContent: "center", alignItems: "center" }}>
                <Image 
                 style={{ resizeMode: "contain", flex: 1, height:verticalScale(10),width: horizoltalscale(10)}}
                 source={lend} />
                <Text
                    style={{
                        flex: 5,
                        fontWeight: "bold",
                        margin: moderateScale(2),
                        fontSize:17,
                    }}
                >
                    {datasource.Name}
                </Text>
            </View>
            
        </TouchableOpacity>;
    }

}