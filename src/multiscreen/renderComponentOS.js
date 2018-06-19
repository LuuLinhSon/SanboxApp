import React, { Component } from 'react';
import {
    TextInput,
    Platform,
} from 'react-native';
import styles from '../style/styles';
import {
  horizoltalscale,
  verticalScale,
  moderateScale
} from "../multiscreen/formula";

export function textInputUserName(This) {
    if (Platform.OS === "android") {
        return <TextInput 
        onChangeText={(value) => This.setState({ username: value })} 
        style={styles.textinput} 
        placeholder="Tên đăng nhập" 
        placeholderTextColor="#000000" 
        underlineColorAndroid="transparent" 
        numberOfLines={1}
        ref={input => { This.textInput = input }}
        />;
    } else {
        return <TextInput onChangeText={value => This.setState({
                password: value
              })} style={styles.textinput} placeholder="Tên đăng nhập" placeholderTextColor="#000000" />;
    }
}


export function textInputPassword(This) {
    if (Platform.OS === "android") {
        return <TextInput 
        onChangeText={(value) => This.setState({ password: value })} 
        style={styles.textinput} 
        secureTextEntry={This.state.hidePassword} 
        placeholder="Mật khẩu" placeholderTextColor="#000000" 
        underlineColorAndroid="transparent" 
        numberOfLines={1}
        />;
    } else {
        return <TextInput onChangeText={value => This.setState({
                password: value
              })} style={styles.textinput} secureTextEntry={true} placeholder="Mật khẩu" placeholderTextColor="#000000" />;
    }
}

export function textInputFullName(This) {
    if (Platform.OS === "android") {
        return <TextInput 
        onChangeText={(value) => This.setState({ fullname: value })} 
        style={styles.textinput} 
        placeholder="Họ và tên" 
        placeholderTextColor="#000000" 
        underlineColorAndroid="transparent"
        numberOfLines={1}
         />;
    } else {
        return <TextInput onChangeText={value => This.setState({
            fullname: value
        })} style={styles.textinput} placeholder="Họ và tên" placeholderTextColor="#000000" />;
    }
}

export function textInputEmail(This) {
    if (Platform.OS === "android") {
        return <TextInput 
        onChangeText={(value) => This.setState({ email: value })} 
        style={styles.textinput} 
        placeholder="Email" 
        placeholderTextColor="#000000" 
        underlineColorAndroid="transparent" 
        numberOfLines={1}
        ref={input => { This.textInput = input }}
        />;
    } else {
        return <TextInput onChangeText={value => This.setState({
            email: value
        })} style={styles.textinput} placeholder="Email" placeholderTextColor="#000000" />;
    }
}

export function textInputNumberPhone(This) {
    if (Platform.OS === "android") {
        return <TextInput 
        onChangeText={(value) => This.setState({ numberphone: value })} 
        style={styles.textinput} 
        placeholder="Điện thoại" 
        placeholderTextColor="#000000" 
        underlineColorAndroid="transparent" 
        numberOfLines={1}
        />;
    } else {
        return <TextInput onChangeText={value => This.setState({
            numberphone: value
        })} style={styles.textinput} placeholder="Điện thoại" placeholderTextColor="#000000" />;
    }
}

export function textInputAddress(This) {
    if (Platform.OS === "android") {
        return <TextInput 
        onChangeText={(value) => This.setState({ address: value })} 
        style={styles.textinput} 
        placeholder="Thành phố" 
        placeholderTextColor="#000000" 
        underlineColorAndroid="transparent" 
        numberOfLines={1}
        />;
    } else {
        return <TextInput onChangeText={value => This.setState({
            address: value
        })} style={styles.textinput} placeholder="Thành phố" placeholderTextColor="#000000" />;
    }
}

export function textInputOldPass(This) {
    if (Platform.OS === "android") {
        return <TextInput 
        onChangeText={(value) => This.setState({ oldpassword: value })} 
        style={styles.textinput} 
        placeholder="Mật khẩu cũ" 
        placeholderTextColor="#000000" 
        underlineColorAndroid="transparent" 
        numberOfLines={1}
        />;
    } else {
        return <TextInput onChangeText={value => This.setState({
            oldpassword: value
        })} style={styles.textinput} placeholder="Mật khẩu cũ" placeholderTextColor="#000000" />;
    }
}

export function textInputNewPass(This) {
    if (Platform.OS === "android") {
        return <TextInput 
        onChangeText={(value) => This.setState({ newpassword: value })} 
        style={styles.textinput} 
        placeholder="Mật khẩu mới" 
        placeholderTextColor="#000000" 
        underlineColorAndroid="transparent" 
        numberOfLines={1}
        />;
    } else {
        return <TextInput onChangeText={value => This.setState({
            newpassword: value
        })} style={styles.textinput} placeholder="Mật khẩu mới" placeholderTextColor="#000000" />;
    }
}

export function textInputConfirmNewPass(This) {
    if (Platform.OS === "android") {
        return <TextInput 
        onChangeText={(value) => This.setState({ confirmnewpassword: value })} 
        style={styles.textinput} 
        placeholder="Xác nhận mật khẩu" 
        placeholderTextColor="#000000" 
        underlineColorAndroid="transparent" 
        numberOfLines={1}
        />;
    } else {
        return <TextInput onChangeText={value => This.setState({
            confirmnewpassword: value
        })} style={styles.textinput} placeholder="Xác nhận mật khẩu" placeholderTextColor="#000000" />;
    }
}

export function textInputSearch(This) {
    if (Platform.OS === "android") {
        return <TextInput 
        onChangeText={(value) => This.setState({ search: value })} 
        style={{
            backgroundColor:'#FFF',
            flex: 1,
            color: "#000000",
            fontSize: moderateScale(13),
            height: verticalScale(40),
            margin: moderateScale(2),
            padding: 2, 
            textAlign:'center'
            }} 
        placeholder="Tìm kiếm" 
        placeholderTextColor="#CCC" 
        underlineColorAndroid="transparent"
        numberOfLines={1} 
        autoCapitalize='none'
        selectionColor='black'
        returnKeyType={'search'}
        autoFocus={true}
         />;
    } else {
        return <TextInput onChangeText={value => This.setState({
            search: value
        })} style={styles.textinput} placeholder="Tìm kiếm" placeholderTextColor="#000000" />;
    }
}