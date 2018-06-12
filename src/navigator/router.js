import React, { Component } from "react";
import {
  createStackNavigator,
  createTabNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
  
} from "react-navigation";
import {
    Image,Text,View
} from 'react-native';
import {
  horizoltalscale,
  verticalScale,
  moderateScale
} from "../multiscreen/formula";

import HomeScreen from '../screen/home';
import SignInScreen from '../screen/signin';
import PersonalScreen from '../screen/personal';
import PaymentScreen from '../screen/payment';
import PaymentHistoryScreen from '../screen/historypayment';
import ChangeInfoScreen from '../screen/changeinfo';
import ChangePasswordScreen from '../screen/changepassword';
import SignUpScreen from '../screen/signup';
import ReminderScreen from '../screen/reminder';
import AuthLoadingScreen from '../screen/authloading';
import PersonalDetailScreen from '../screen/personaldetail';
import ListDetailScreen from '../screen/listdetail';
import DocumentDetailScreen from '../screen/documentdetail';
import WebViewPayment from '../screen/webviewpayment';
import AnswerScreen from "../screen/answer";
import Menu from "../screen/menu";
import SearchScreen from "../screen/search"



// Cấp 2
const PersonalStack = createStackNavigator(
  {
    Personal: {
      screen: PersonalScreen,
      navigationOptions: {
        header: null
      }
    },
    PersonalDetail: {
      screen: PersonalDetailScreen,
      navigationOptions: {
        header: null
      }
    },
    Payment: {
      screen: PaymentScreen,
      navigationOptions: {
        header: null
      }
    },
    HistoryPayment: {
      screen: PaymentHistoryScreen,
      navigationOptions: {
        header: null
      }
    },
    ChangeInfo: {
      screen: ChangeInfoScreen,
      navigationOptions: {
        header: null
      }
    },
    ChangePassword: {
      screen: ChangePasswordScreen,
      navigationOptions: {
        header: null
      }
    },
    WebviewPayment: {
      screen: WebViewPayment,
      navigationOptions: {
        header: null
      }
    }
  },
  
  {
    initialRouteName: "Personal"
  }
);     
    
const AuthStack = createStackNavigator(
  {
    SignIn: {
      screen: SignInScreen,
      navigationOptions: {
        header: null
      }
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: {
        header: null
      }
    },
    Reminder: {
      screen: ReminderScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "SignIn"
  }
);    

// Cấp 3

export const Switch = createSwitchNavigator(
    {
        Auth: {
           screen: AuthStack,
           navigationOptions: {
             header: null
           }
         },
         AuthLoading: {
           screen: AuthLoadingScreen,
           navigationOptions: {
             header: null
           }
         },
         App: {
           screen: PersonalStack,
           navigationOptions: {
             header: null
           }
         },  
    },
    {
        initialRouteName: "AuthLoading",
    }
);    

const AppStack = createStackNavigator(
    { 
        Home: {
           screen: HomeScreen,
           navigationOptions: {
             header: null
           }
         },
         List: {
           screen: ListDetailScreen,
           navigationOptions: {
             header: null
           }
         },
         Detail: {
           screen: DocumentDetailScreen,
           navigationOptions: {
             header: null
           }
         },
         Answer: {
          screen: AnswerScreen,
          navigationOptions: {
          header: null
          }
         },

         Search: {
           screen: SearchScreen,
           navigationOptions: {
           header: null
         }
  },
    
    });

const UserStack = createStackNavigator(
    {
        Switchs: {
           screen: Switch,
           navigationOptions: {
             header: null
           }
         }
    });      


export const Tabbar = createBottomTabNavigator(
    {
        HOME: {
           screen: AppStack,
           navigationOptions: {
             header: null
           }
         },
         USER: {
           screen: UserStack,
           navigationOptions: {
             header: null
           }
         },
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === "HOME") {
                    iconName = require("../icons/if_book_edit_35733.png");
                } else if (routeName === "USER") {
                    iconName = require("../icons/if_system-users_15357.png");
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Image source={iconName} />;
            },
            tabBarLabel: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let labelName;
                if (routeName === "HOME") {
                    labelName = "KHO TÀI LIỆU" ;
                } else if (routeName === "USER") {
                    labelName = "CÁ NHÂN";
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <View style={{justifyContent:"center",alignItems:"center"}}><Text style={{fontSize:12,color:"#000"}}> {labelName} </Text></View>;
            }

        }),
        tabBarOptions: {
            activeTintColor: "tomato",
            inactiveTintColor: "gray"
        }
    }
);

export const MyApp = createDrawerNavigator({
    Tabbar: {
        screen: Tabbar,
        navigationOptions: {
             header: null
           }
    },
  
    
},
{
    portraitOnlyMode: true,
    drawerWidth: verticalScale(350),
    drawerPosition: 'left',
    drawerLockMode: 'locked-closed',
    contentComponent: props => <Menu {...props} />
  }
);

