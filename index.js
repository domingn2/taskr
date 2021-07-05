import React, { Component } from 'react'
import { AppRegistry } from 'react-native'

import AppStorage from './app_storage'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <AppStorage />
    )
  }
}

AppRegistry.registerComponent('Taskly', () => App)
