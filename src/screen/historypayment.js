import React, { Component } from 'react';
import {
    Text, View, Image, TouchableHighlight, TouchableOpacity,ListView
} from 'react-native';
import styles from '../style/styles';
import { textInputUserName, textInputPassword } from '../multiscreen/renderComponentOS';
import { horizoltalscale, verticalScale, moderateScale } from "../multiscreen/formula";
import Moment from "moment";
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class PaymentHistoryScreen extends Component {

    constructor(props) {
        super(props);

        user = require("../icons/userfb.jpg");
        lend = require("../icons/baseline_lens_black_18dp.png");
        menu = require("../icons/baseline_menu_white_18dp.png");
        search = require("../icons/baseline_search_white_18dp.png");
        tailieunho = require("../icons/if_book_edit_35733.png");
        canhannho = require("../icons/if_system-users_15357.png");
        back = require("../icons/baseline_keyboard_arrow_left_white_18dp.png");

        data=[];

        this.state = {
            dataSource: ds.cloneWithRows(data),
        };

    }

    componentDidMount(){
        // RNProgressHUB.showSpinIndeterminate();

        console.log("http://readbook.vietesoft.com/api/ApiLog/listTransaction?clientKey=676e8b1b13e894b7bc65c085d120fc25&token=" +
            this.props.navigation.getParam('callhistory') +
            "&type=json");
        try {
            fetch("http://readbook.vietesoft.com/api/ApiLog/listTransaction?clientKey=676e8b1b13e894b7bc65c085d120fc25&token=" +
            this.props.navigation.getParam('callhistory') +
            "&type=json")
              .then(response => response.json())
              .then(resdata => {
                //   RNProgressHUB.dismiss();
                if (resdata.status === true) {
                  data = resdata.data;
                    console.log("HISTORYPAYMENT" + JSON.stringify(data));
                    
                  this.setState({
                    dataSource: ds.cloneWithRows(data),
                  });
                } else {
                    alert(resdata.message);
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
                    LỊCH SỬ NẠP TIỀN{" "}
                </Text>

                <TouchableHighlight onPress={this._onPressSearch.bind(this)} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Image style={{ resizeMode: "contain", height:verticalScale(30) , width: "100%" }} source={search} />
                </TouchableHighlight>
            </View>
        );
    }

    _renderContentView() {
        return <View style={{ flex: 13, backgroundColor: "#FFF" }}>
            <View style={{ flex: 1, // width: "100%",
                backgroundColor: "#FFF", // justifyContent: "flex-start",
                // alignItems: "flex-start",
                margin: moderateScale(10) }}>
              <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", height: "8%", marginBottom: verticalScale(10) }}>
                <View style={{ justifyContent: "flex-start", alignItems: "center" }}>
                  <Image style={{ height: verticalScale(5), resizeMode: "contain", start: 0 }} source={lend} />
                </View>
                <Text
                  style={{
                    color: "#000",
                    fontSize: moderateScale(18),
                    textAlign: "left",
                    fontWeight: "bold"
                  }}
                >
                  LỊCH SỬ NẠP TIỀN
                </Text>
              </View>

              <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    enableEmptySections={true}
                    style={{flex:1}}
              />


            </View>
            <TouchableOpacity onPress={this._onPressPayment.bind(this)} style={{ flex: 1, margin: moderateScale(10), justifyContent: "flex-end", alignItems: "center" }}>
              <View style={{ backgroundColor: "#CCC", justifyContent: "center", alignItems: "center", height: verticalScale(40), borderRadius: 5, width: "100%", marginBottom: verticalScale(10) }}>
                <Text style={{ color: "#EF6C00", fontWeight: "bold" }}>
                  NẠP TIỀN
                </Text>
              </View>
            </TouchableOpacity>
          </View>;
    }

    _onPressBack() {
        this.props.navigation.goBack();
    }

    _onPressSearch() {
        const { navigate } = this.props.navigation;
        navigate("Search"); 
    }


    _onPressPayment(){
        this.props.navigation.navigate("WebviewPayment");
    }
     _renderRow(datasource){
        //  Moment.locale('en');
        return(
            <View style={{ flexDirection: 'row', height: verticalScale(50), width:'100%', backgroundColor: '#FFF', margin: moderateScale(3), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ flex: 1, margin: moderateScale(2) }}>{Moment(datasource.TradeTime).format("DD/MM/YYYY")}</Text>
                <Text style={{ flex: 1, margin: moderateScale(2) }}>{datasource.Name + ": " + datasource.NumberDay + "ngày" }</Text>
                    <Text style={{ flex: 1, margin: moderateScale(2) }}>{datasource.TradeMoney + " VND"}</Text>
                </View>
        );
     }

}