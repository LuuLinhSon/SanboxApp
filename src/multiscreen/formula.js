import React, { Component } from 'react';
import { Dimensions, StyleSheet } from 'react-native'
const { height, width } = Dimensions.get('window'); // device height and width
// ui được thiết kế cho size màn hình là (411x731)
// const standarWidth = 360;
// const standardHeight = 592;
// const boxWidth =  300/standarWidth * width;
// const boxHeight = 450/standardHeight * height;
// const textFontSize = 14/standarWidth * width;
// const buttonTextFontSize = 14/standarWidth * width;
// const titleFontSize = 20/standarWidth * width;
// const buttonWidth = 150/standarWidth * width;
// const buttonHeight = 49/standardHeight * height;
// const lineHeight = 25/standardHeight * height;
// const marginBottom = 10/standardHeight * height;
// const padding = 10/standarWidth * width;


//Chiều rộng và cao cho design chuẩn.
const guidelineBaseWidth = 411;
const guidelineBaseHeight = 731;

export const horizoltalscale = size => width / guidelineBaseWidth * size;
export const verticalScale = size => height / guidelineBaseHeight * size;
export const moderateScale = (size, factor = 0.5) => size + (horizoltalscale(size) - size) * factor;

// import { scale, verticalScale, moderateScale } from "../screen/multiscreen";


