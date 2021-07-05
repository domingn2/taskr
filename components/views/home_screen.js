/**
 * Home screen
 * This will take all homescreen UI views and put them
 *together to create the homescreen for the application.
 */
import React, { Component } from 'react'
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import Icon from 'react-native-vector-icons/Ionicons'
import { firebaseApp } from '../../firebase'
import LoginScreen from './login_screen'
import { signedOut } from '../../actions'
import NavigationTab from '../../components/home_screen/navTab'
import Timeline from '../../components/home_screen/timeline'
import CreateNew from '../../components/home_screen/create_task'
import MyPosts from '../../components/home_screen/myPosts'
import Settings from '../../components/home_screen/settingsTab'

class HomeScreen extends Component {
  constructor(props) {
    super(props)
  }

  /**
   * creates the homescreen UI, sets up Navigation tabs for each UI, sets
   * color for status bar
   */
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
        backgroundColor={'#FFAD2B'}
        animated={true}
        />
        <ScrollableTabView
        initialPage={0}
        renderTabBar={() => <NavigationTab />}
        tabBarPosition="bottom"
        >
          <Timeline tabLabel="md-pulse"/ >
          <CreateNew tabLabel="md-create"/>
          <MyPosts tabLabel="md-contact"/>
          <Settings
          tabLabel="ios-settings"
          onLogOut={ () => {this._onLogOut()} }
          />
        </ScrollableTabView>
      </View>
    )
  }
  /**
   * if user signs out navigation will update to log in screen
   */
  _onLogOut() {
    firebaseApp.auth().signOut().then(() => {
      this.props.navigator.pop()
      this.props.signedOut()
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
})

export default connect(null, {signedOut})(HomeScreen);
