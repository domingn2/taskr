/**
 * this is the main application component
 * it is used to configure the navigator
 * and lock to screen to portrait mode only
 * this will also determine what screen to show
 * according to the signed in status of the user
 */

import React, { Component } from 'react'
import {
  Navigator,
  View,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'

import LoginScreen from './components/views/login_screen'
import HomeScreen from './components/views/home_screen'
import NavigationExperimental from 'react-native-deprecated-custom-components'

import { firebaseApp } from './firebase'

class App extends Component {
  constructor(props) {
    super(props)

    console.ignoredYellowBox = [
      'Setting a timer'
      ];

    this.routes = [
      { view: LoginScreen },
      { view: HomeScreen }
    ]
  }

  render() {

    let navigator
    if (this.props.currentUser.signInStatus) {
      navigator =
        <NavigationExperimental.Navigator
          style={{ flex: 1 }}
          initialRoute={this.routes[1]}
          initialRouteStack={this.routes}
          renderScene={this.renderScene}
          configureScene={this.configureScene}
        />
    }
    else {
      navigator =
        <NavigationExperimental.Navigator
          style={{ flex: 1 }}
          initialRoute={this.routes[0]}
          initialRouteStack={this.routes}
          renderScene={this.renderScene}
          configureScene={this.configureScene}
        />
    }
    return (
    <View style={{flex: 1}}>
      {navigator}
    </View>
  )
}

  renderScene(route, navigator) {
    return <route.view navigator={navigator} {...route}/>
  }

  configureScene(route, routeStack) {
    return NavigationExperimental.Navigator.SceneConfigs.FloatFromRight
  }
}
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(App)
