import {
    StyleSheet,
} from 'react-native'

import { horizoltalscale, verticalScale, moderateScale } from "../multiscreen/formula";

const styles = StyleSheet.create({
  backgroundContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF"
  },
  container: {
    flex: 1,
    alignItems: "center"
  },

  logo: {
    backgroundColor: "rgba(0,0,0,0)",
    width: horizoltalscale(160),
    resizeMode: "contain"
  },
  backdrop: {
    flex: 30,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain"
  },

  headline: {
    fontSize: moderateScale(12),
    // textAlign: 'center',
    color: "white",
    alignSelf: "flex-end",
    fontStyle: "italic",
    marginBottom: verticalScale(15)
  },
  textlogin: {
    fontSize: moderateScale(15),
    textAlign: "center",
    color: "white",
    backgroundColor: "#009fe1",
    // justifyContent: "center",
    // alignItems: "center",
    borderRadius: 5,
    padding: moderateScale(10)
  },
  viewlogin: {
    // remove width and height to override fixed static size
    width: "100%",
    flex: 1
  },
  textinput: {
    flex: 120,
    // backgroundColor: "rgba(255, 255, 255, 0.9)",
    color: "#000000",
    fontSize: moderateScale(14),
    margin: moderateScale(2),
    height: '100%',
    padding: 2, 
    textAlign:'left'

  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(15),
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    height: verticalScale(50),
    width: "100%",
  },
  line: {
    width: horizoltalscale(2),
    height: verticalScale(35),
    flex: 1,
    backgroundColor: "rgba(192,192,192,0.3)"
  },

  textconnectwith: {
    color: "#009fe1",
    margin: moderateScale(5),
    fontSize: moderateScale(12),
    flex: 1,
    textAlign: "center"
  },
  rowsocial: {
    backgroundColor: "rgba(0,0,0,0.6)",
    flex: 1,
    flexDirection: "row",
    margin: moderateScale(5),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "baseline"
  },
  imagesocial: {
    width: horizoltalscale(1),
    height: verticalScale(1),
    margin: moderateScale(5)
  },

  textsocial: {
    color: "#FFF",
    fontSize: moderateScale(9),
    margin: moderateScale(8)
  },
  textdangnhap: {
    color: "#009fe1",
    fontSize: moderateScale(25),
    fontWeight: "bold",
    marginTop: verticalScale(20),
    marginBottom: verticalScale(30)
  },

  rowdangkymoi: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(15),
    height: verticalScale(50),
    width: "100%"
  },

  rowtailieu: {
    flexDirection: "row",
    alignItems: "center",
    height: verticalScale(50),
    width: "100%",
    position: "absolute",
    bottom: 0,
    justifyContent: "center"
  },
  documentimage: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain"
  },
  columntailieu: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: verticalScale(140)
  },
  documenttext: {
    flex: 2,
    // backgroundColor: "rgba(255, 255, 255, 0.9)",
    color: "#000000",
    fontSize: moderateScale(12),
    marginBottom: verticalScale(5)
  },
  textdangky: {
    color: "#009fe1",
    fontSize: moderateScale(15),
    fontWeight: "bold",
    marginTop: verticalScale(20),
    marginBottom: verticalScale(50)
  },
  overlayy: {
    // position: "absolute",
    // top: 10,
    // bottom: 10,
    // left: 10,
    // right: 10,
    // opacity: 1,
    flex:14,
    marginBottom: verticalScale(20),
    justifyContent:'center',
    
  },
  overlay: {
    // position: "absolute",
    // top: 10,
    // bottom: 10,
    // left: 10,
    // right: 10,
    // opacity: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex:14,
    margin: verticalScale(20)
  }
});

export default styles;

