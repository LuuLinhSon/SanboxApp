import { StyleSheet, View, Text, ListView, Image, DrawerLayoutAndroid, TouchableHighlight, TouchableOpacity, AsyncStorage} from 'react-native';
import React, { Component} from 'react';
import PropTypes from "prop-types";
import ViewPager from 'react-native-viewpager';
import styles from "../style/styles";
import { horizoltalscale, verticalScale, moderateScale } from "../multiscreen/formula";
// import RNProgressHUB from "react-native-progresshub";

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const ps = new ViewPager.DataSource({
  pageHasChanged: (p1, p2) => p1 !== p2
});


export default class HomeScreen extends Component {

    constructor(props) {
        super(props);

        tailieunho = require("../icons/if_book_edit_35733.png");
        canhannho = require("../icons/if_system-users_15357.png");
        menu = require("../icons/baseline_menu_white_18dp.png");
        search = require("../icons/baseline_search_white_18dp.png");
        user = require("../icons/userfb.jpg");
        lend = require("../icons/baseline_lens_black_18dp.png");
        
        
        dataDoc = [];
        dataCate = [];
        dataSlide = [];
        
        this.state = {
            dataSourceCate: ds.cloneWithRows(dataCate),
            dataSourceDoc: ds.cloneWithRows(dataDoc),
            dataSourceSlide: ps.cloneWithPages(dataSlide),
            vip:false
        };

        
    }

    componentDidMount(){
        // RNProgressHUB.showSpinIndeterminate();
        try {
            fetch("http://readbook.vietesoft.com/api/ApiGetData?clientKey=676e8b1b13e894b7bc65c085d120fc25&token=6372f6d26d318a17348c3a383a03623f&type=json")
              .then(response => response.json())
              .then(resdata => {
                //   RNProgressHUB.dismiss();
                if (resdata.status === true) {
                  dataCate = resdata.data.lstCate;
                  dataDoc = resdata.data.lstDoc;
                  dataSlide = resdata.data.lstSlider;
                    console.log("HOME " + JSON.stringify(dataDoc));
                  this.setState({
                    dataSourceCate: ds.cloneWithRows(dataCate),
                    dataSourceDoc: ds.cloneWithRows(dataDoc),
                    dataSourceSlide: ps.cloneWithPages(dataSlide)
                  });
                } else {
                  alert("Lỗi không tải được dữ liệu");
                }
              });
        } catch (error) {
            console.log(error);
            throw error;
        }

            AsyncStorage.getItem('UserUpdate')
                .then((valuestr) => JSON.parse(valuestr))
                .then((data) => {
                    if (data === null) {
                        AsyncStorage.getItem('User')
                            .then((valuestr) => JSON.parse(valuestr))
                            .then((data) => {
                                this.setState({
                                    "vip": data.data.vip
                                });
                                console.log("Lấy token trong Personal : " + data.token);
                                AsyncStorage.setItem("Token", data.token);
                            });

                    } else {
                        AsyncStorage.getItem('UserUpdate')
                            .then((valuestr) => JSON.parse(valuestr))
                            .then((data) => {
                                this.setState({
                                    "vip": data.data.vip
                                });
                            });
                    }
                }); 
        

        
    }

    render() {
        return <View style={{ flex: 1, backgroundColor: "#E0E0E0" }}>
            <View style={{ flex: 1, backgroundColor: "#2196F3", flexDirection: "row", alignItems: "center", justifyContent: "center", height: verticalScale(50) }}>
                <TouchableHighlight onPress={this._onPressMenu.bind(this)} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Image style={{ resizeMode: "contain", height: verticalScale(30), width: "100%" }} source={menu} />
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
                    TEST FOR SERVANTS{" "}
                </Text>

                <TouchableHighlight onPress={this._onPressSearch.bind(this)} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Image style={{ resizeMode: "contain", height: verticalScale(30), width: "100%" }} source={search} />
                </TouchableHighlight>
            </View>

            <View style={{ flex: 13 }}>
                <ViewPager 
                style={{flex:0.1}}
                dataSource={this.state.dataSourceSlide}
                renderPage={this._renderPage.bind(this)}
                autoPlay={true}
                isLoop={true}
                enableEmptySections={true}
                />
                     
                <View style={{ flexDirection: "row",flex:0.1 }}>
                    <Text style={{ flex: 1, color: "#2196F3", fontSize: 15, marginLeft: horizoltalscale(5) }}>
                       TÀI LIỆU MỚI
                    </Text>
                    <TouchableOpacity style={{ flex: 1}} onPress={this._onPressTextAll.bind(this)}>
                    <Text style={{ flex: 1, color: "#000000", fontSize: verticalScale(10), textAlign: "right", marginRight: horizoltalscale(5) }}>
                        XEM TẤT CẢ!
                    </Text>
                    </TouchableOpacity>
                </View>

                <View style={{flex:0.45,marginTop:5 }}>
                    <ListView
                        horizontal={true}
                        dataSource={this.state.dataSourceDoc}
                        renderRow={this._renderRow.bind(this)}
                        enableEmptySections={true}
                        style={{margin:moderateScale(3)}}
                        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => {
                            return (
                                <View
                                    key={sectionID + " - " + rowID}
                                    style={{ width: horizoltalscale(3), height: "100%", backgroundColor: "#CCC" }}>
                                </View>
                            );
                        }}

                         />
                </View>

                <View style={{ flex:0.2,flexDirection: "column", backgroundColor: "#FFF", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "#2196F3", fontSize: moderateScale(15), textAlign: "center" }}>
                        {" "}
                        DANH MỤC TÀI LIỆU{" "}
                    </Text>
                    <View style={{ height: verticalScale(1), width: '100%', backgroundColor:'#CCC',marginTop:verticalScale(2)}}>
                    </View>
                </View>

                <ListView 
                 style={{ flex:1,width: "100%", backgroundColor: "#FFF",marginBottom:verticalScale(5)}} 
                 pageSize={dataCate.length} 
                 dataSource={this.state.dataSourceCate} 
                 renderRow={this._renderRowGrid.bind(this)} 
                 enableEmptySections={true}
                 contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap",justifyContent: "center", alignItems: "center"}} />
            </View>
        </View>;
    }


    _renderRow(datasource) {
        return <TouchableOpacity onPress={() => {
              if ((datasource.Fee === true) && (global.vip === true)) {
                this.props.navigation.navigate("Detail", {
                  calldoc: datasource.ID
                });
                console.log("1");
              } else if(datasource.Fee === false){
                  this.props.navigation.navigate("Detail", {
                      calldoc: datasource.ID
                  });
                  console.log("2");
              }else{
                  alert("Bạn cần tài khoản VIP để xem tài liệu này!");
              }
            }} style={{ borderRadius:5,flex: 1, justifyContent: "center", alignItems: "center", height: verticalScale(90), width: horizoltalscale(200) }}>
            <View style={{ borderRadius:5, flexDirection: "row", height: verticalScale(90), width: horizoltalscale(200), backgroundColor: "#FFF", margin: moderateScale(3), justifyContent: "center", alignSelf: "flex-start",padding:moderateScale(2) }}>
              <Image style={{ resizeMode: "contain", height: verticalScale(80), width: horizoltalscale(80), flex: 1 }} source={{ uri: datasource.Photo }} />
              <Text
                style={{
                  flex: 1,
                  fontWeight: "bold",
                  margin: moderateScale(2),
                  textAlignVertical:'top',
                }}
              >
                {datasource.Title}
              </Text>
            </View>
          </TouchableOpacity>;
    }

    _renderRowGrid(datasource) {
        return (
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("List",{call:datasource.ID})} style={{justifyContent: 'center', alignItems: 'center', height: verticalScale(150) }}>
                <View style={{ flexDirection: 'column', height: verticalScale(140), width: horizoltalscale(130), backgroundColor: '#FFF', margin: moderateScale(3) }}>
                  <Image style={{ height: verticalScale(110), width: horizoltalscale(130), flex: 5,resizeMode:'contain' }} source={{ uri: datasource.Photo }} />
                  <Text style={{ flex: 2, fontWeight: 'bold', margin: moderateScale(2),textAlign:'center' }}>{datasource.Name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    _renderPage(datasource){
        return(
            <View style={{flex:1,height:'100%'}}>
                <Image style={{ resizeMode: 'contain', flex: 1, backgroundColor: '#FFF' }} source={{ uri: datasource.Url }}/>
            </View>
        );
    }

    _onPressTextAll(){
        this.props.navigation.navigate("List");
    }

    _onPressMenu() {
        this.props.navigation.openDrawer();
    };

    _onPressSearch() {
        const { navigate } = this.props.navigation;
        navigate("Search");
    };


}