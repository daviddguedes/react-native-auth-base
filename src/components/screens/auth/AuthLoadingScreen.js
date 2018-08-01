import React, { Component, Fragment } from 'react';
import { 
   AsyncStorage, 
   ActivityIndicator, 
   StatusBar, 
   DeviceEventEmitter } from 'react-native';

import Parse from 'parse/react-native';

export default class AuthLoadingScreen extends Component {

   constructor(props) {
      super(props);
   }

   componentWillMount() {
      DeviceEventEmitter.addListener('userLoggedIn', this.redirectAuth.bind(this))
      DeviceEventEmitter.addListener('userLoggedOut', this.redirectAuth.bind(this))
   }

   componentDidMount() {
      this.initializeApp();
      this.redirectAuth();
   }

   initializeApp() {
      Parse.initialize('app_id', 'javascript_key');
      Parse.serverURL = 'http://localhost:1337/parse'
      // Parse.serverURL = 'https://de532b54.ngrok.io/parse'
      Parse.setAsyncStorage(AsyncStorage);
      window.Parse = Parse;
   }

   componentWillUnmount() {
      // DeviceEventEmitter.removeAllListeners();
   }

   redirectAuth = async () => {
      try {
         const user = await Parse.User.currentAsync();
         this.props.navigation.navigate(user ? 'Main' : 'Login');  
      } catch (error) {
         alert('Erro: ', error.message);
      }
   }

   render() {
      return (
         <Fragment>
            <ActivityIndicator />
            <StatusBar barStyle='dark-content' />
         </Fragment>
      );
   }
}