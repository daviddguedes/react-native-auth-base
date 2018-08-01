import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from './../screens/auth/AuthLoadingScreen';
import Login from './../screens/auth/Login';
import Signup from './../screens/auth/Signup';
import Main from './../screens/main/Main';

const AuthStackNav = createStackNavigator({
   Login: Login,
   Signup: Signup
});

const MainStackNav = createStackNavigator({
   Main: Main
});

export default createSwitchNavigator({
   AuthLoading: AuthLoadingScreen,
   Auth: AuthStackNav,
   Main: MainStackNav
}, {
      initialRouteName: 'AuthLoading'
   });