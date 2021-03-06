import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Keyboard, ActivityIndicator } from 'react-native';
import { Input, H3, Button } from 'nachos-ui';
import Spinner from 'react-native-loading-spinner-overlay';


import { app } from './../feathers'
import { loginPageStyles as styles, theme } from './../styles';

export default class LoginPage extends Component<{}> {
  constructor() {
    super();
    this.state = {
      spinnerVisible: true,
      buttonSpinnerVisible: false,
      badLogin: false,
      emailInput: {
        status: 'normal',
        value: '',
        valid: false
      },
      passwordInput: {
        status: 'normal',
        value: '',
        valid: false
      },
    };

  }

  goToHomePage(){
    this.props.navigator.resetTo({
      screen: 'epres.HomePage',
      title: 'Medicine list',
      animated: true,
    });
  }

  goToQRPage(){
    this.props.navigator.push({
      screen: 'epres.QRReaderPage',
      title: 'QR',
      animated: true,
    });
  }

  componentWillMount() {
    if (!this.props.loggedOut) {
      app.authenticate().then((token) => {
        return app.passport.verifyJWT(token.accessToken)
      })
      .then(payload => {
        return app.service('users').get(payload.userId);
      })
      .then(user => {
        app.set('user', user);
        this.setState({spinnerVisible: true})
        this.goToHomePage();
      })
      .catch((err) => {
        console.log(err);
        app.logout().catch((err) => {
          console.log(err);
        })
        this.setState({spinnerVisible: false})
      })
    } else {
      this.setState({spinnerVisible: false})
    }
  }

   emailHandler(value){
     let emailInput
     if (value.length > 0) {
       if (this.validateEmail(value)) {
         emailInput = {
           status: 'valid',
           value: value,
           valid: true
         }
       } else {
         emailInput = {
           status: 'error',
           value: value,
           valid: false
         }
       }
     } else {
       emailInput = {
         status: 'normal',
         value: value,
         valid: false
       }
     }
     this.setState({emailInput, badLogin: false});
   }

   validateEmail(email){
     const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
     return emailPattern.test(email);
   }

   passwordHandler(password){
     let passwordInput
     if (password.length > 0) {
       passwordInput = {
         status: 'valid',
         value: password,
         valid: true
       }
     } else {
       passwordInput = {
         status: 'normal',
         value: password,
         valid: false
       }
     }
     this.setState({passwordInput, badLogin: false});
   }

   signIn(){
     Keyboard.dismiss();
     this.setState({buttonSpinnerVisible: true})
     app.authenticate({
       strategy: 'local',
       email: this.state.emailInput.value,
       password: this.state.passwordInput.value
     }).then(response => {
       return app.passport.verifyJWT(response.accessToken);
     })
     .then(payload => {
       return app.service('users').get(payload.userId);
     })
     .then(user => {
       app.set('user', user);
       this.setState({buttonSpinnerVisible: false})
       this.goToHomePage();
     })
     .catch((err) => {
       console.log(err);
       this.setState({
         buttonSpinnerVisible: false,
         badLogin: true
       })
     })
   }

  render() {
    return (
      <View style={styles.container}>
      <Spinner
        visible={this.state.spinnerVisible}
        overlayColor="rgba(0, 0, 0, 1)"
        textContent={"Loading..."}
        textStyle={{color: '#FFF'}}
         />
        <Input
          status={this.state.emailInput.status}
          style={{margin: 15}}
          placeholder='Email'
          value={this.state.emailInput.value}
          onChangeText={value => this.emailHandler(value)}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          status={this.state.passwordInput.status}
          style={{margin: 15}}
          placeholder='Password'
          value={this.state.passwordInput.value}
          onChangeText={value => this.passwordHandler(value)}
          secureTextEntry={true}
          selectTextOnFocus={true}
          returnKeyType="done"
        />
        {this.state.badLogin ? <H3 style={styles.badLogin}>Bad login</H3> : null}
        <View style={styles.signIn}>
          {this.state.buttonSpinnerVisible ?
            <ActivityIndicator
               animating={true}
               color={theme.green}
               size="large"
               style={{marginTop: 20}}/>:
             <Button
               onPress={() => this.signIn()}
               type='success'
               style={{margin: 15, width: 300}}
               kind='squared'
               disabled={!(this.state.passwordInput.valid && this.state.emailInput.valid)}
             >
               Sign In
             </Button>
          }
        </View>
        <H3>OR</H3>
        <Button
          onPress={() => this.goToQRPage()}
          type='primary'
          style={{marginTop: 20, width: 300}}
          kind='squared'
        >
          Sign Up
        </Button>
      </View>
    );
  }
}

LoginPage.propTypes = {
  navigator: PropTypes.object,
  loggedOut: PropTypes.bool
}
