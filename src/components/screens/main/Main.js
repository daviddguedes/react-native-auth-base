import React, { Component, Fragment } from 'react';
import { AsyncStorage, DeviceEventEmitter } from 'react-native';

import { Container, Button, Icon, Text } from 'native-base';

const LogoTitle = (props) => {
   return <Text>Topo</Text>
}

export default class Main extends Component {

   constructor(props) {
      super(props);
      this.state = {
         Parse: window.Parse,
         user: null
      }
   }

   componentDidMount() {
      this.getUserData();
   }

   async getUserData() {
      const user = await this.state.Parse.User.currentAsync();
      if (user) { this.setState({user: user.toJSON()}) };
   }

   static navigationOptions = ({ navigation }) => {
      doLogout = async () => {
         try {
            const logout = await Parse.User.logOut();
            DeviceEventEmitter.emit('userLoggedOut');
         } catch (error) {
            alert('Erro ao fazer logout...');
         }
      }

      return {
         headerTitle: <LogoTitle />,
         headerRight: (
            <Button onPress={() => doLogout()} transparent>
               <Icon name='log-out' />
            </Button>
         )
      }
   };

   render() {
      return (
         <Fragment>
            {this.state.user && <Text>Username: {this.state.user.username }</Text>}
         </Fragment>
      );
   }
}