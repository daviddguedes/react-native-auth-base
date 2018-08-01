import React, { Component, Fragment } from 'react';
import Loader from './../../loader';

import {
   Container,
   Header,
   Button,
   Text,
   Body,
   Form,
   Item as FormItem,
   Input,
   Label,
   Title
} from 'native-base';

export default class Signup extends Component {

   constructor(props) {
      super(props);
      const { Parse } = window;
      this.state = {
         username: null,
         password: null,
         email: null,
         Parse: Parse,
         error: null,
         loading: false
      }
   }

   doSignIn() {
      const { username, password, email, Parse } = this.state;

      if (username && password && email) {
         this.setState({ loading: true });
         const user = new Parse.User();
         user.set("username", username);
         user.set("password", password);
         user.set("email", email);

         user.signUp(null, {
            success: (user) => {
               this.setState({ loading: false });
               this.props.navigation.push('Login');
            },
            error: function (user, error) {
               this.setState({ loading: false });
               this.setState({
                  error: error.message
               });
            }
         });
      } 
   }

   render() {
      return (
         <Container>
            <Form>
               <FormItem floatingLabel>
                  <Label>Username</Label>
                  <Input autoCapitalize='none' onChangeText={(username) => this.setState({ username })} />
               </FormItem>
               <FormItem floatingLabel>
                  <Label>Email</Label>
                  <Input autoCapitalize='none' onChangeText={(email) => this.setState({email})} />
               </FormItem>
               <FormItem floatingLabel last>
                  <Label>Password</Label>
                  <Input secureTextEntry={true} onChangeText={(password) => this.setState({ password })}  />
               </FormItem>

               <Button full primary onPress={() => this.doSignIn()} style={{ paddingBottom: 4 }}>
                  <Text> Sign In </Text>
               </Button>
            </Form>
            {this.state.error && <Text>{JSON.stringify(this.state.error.message)}</Text>}
            <Loader loading={this.state.loading} />
         </Container>
      );
   }
}