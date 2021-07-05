/**
 * login screen
 * this takes all login_screen views and combines them together
 * to create the loginScreen for the application
 */

import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  StatusBar,
  StyleSheet
} from 'react-native'

/**
 * Takes in all views from login_screen
 */
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import { signedIn } from '../../actions'
import { firebaseApp } from '../../firebase'
import HomeScreen from './home_screen'
import Background from '../../components/background'
import InitialView from '../../components/login_screen/initial_view'
import SignInForm from '../../components/login_screen/signIn_form'
import SignUpForm from '../../components/login_screen/signUp_form'
import ForgotPassForm from '../../components/login_screen/forgotPassword_form'

class LoginScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      initialRun: true,
      initialScreen: true,
      signIn: false,
      signUp: false,
      forgotPass: false
    }

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  /**
   *  database functions
   */
  componentDidMount() {
    this.setState({initialRun: false})
  }

  componentDidUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
  }

  /**
   * render function, displays initial view along with sign in sign up buttons
   */
  render() {
    const animationDelay = this.state.initialRun ? 500 : 0

    const initialView = this.state.initialScreen ?
      <InitialView
      onSignIn={this._onSignIn.bind(this)}
      onSignUp={this._onSignUp.bind(this)}
      animDelay={animationDelay}/>
    : null

    const signIn = this.state.signIn ?
      <SignInForm
      goToHomeScreen={this._onSignInSuccess.bind(this)}
      onBackFromSignIn={this._onBackFromSignIn.bind(this)}
      onForgotPass = {this._onForgotPass.bind(this)} />
    : null

    const signUp = this.state.signUp ?
      <SignUpForm
      goToHomeScreen={this._onSignInSuccess.bind(this)}
      onBackFromSignUp={this._onBackFromSignUp.bind(this)} />
    : null

    const fogotPass = this.state.forgotPass ?
      <ForgotPassForm
      onBackFromForgotPass={this._onBackFromForgotPass.bind(this)} />
    : null

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'#FFAD2B'}
          animated={true}
        />

        <Background imgSrouce={require('../../assets/images/background.png')}/>

        <Animatable.View
        animation="bounceInDown"
        style={styles.logoContainer}
        delay={animationDelay}>
        </Animatable.View>

        { initialView }
        { signIn }
        { signUp }
        { fogotPass }

      </View>
    )
  }

  /**
   * sets states based on status
   */
  _onSignIn() {
    this.setState({
      initialScreen: false,
      signIn: true
    })
  }

  _onBackFromSignIn() {
    this.setState({
      initialScreen: true,
      signIn: false
    })
  }

  _onSignUp() {
    this.setState({
      initialScreen: false,
      signUp: true
    })
  }

  _onBackFromSignUp() {
    this.setState({
      initialScreen: true,
      signUp: false
    })
  }

  _onForgotPass() {
    this.setState({
      initialScreen: false,
      signIn: false,
      signUp: false,
      forgotPass: true
    })
  }

  _onBackFromForgotPass() {
    this.setState({
      initialScreen: true,
      forgotPass: false
    })
  }

  _onSignInSuccess() {
    const currentUser = firebaseApp.auth().currentUser
    const email = currentUser.email
    const name = currentUser.displayName
    const uid = currentUser.uid
    this.props.signedIn(email, name, uid)
    this.props.navigator.push({ view: HomeScreen })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default connect(null,{signedIn})(LoginScreen)
