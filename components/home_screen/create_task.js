/**
 * This view is for the create task UI for the app, it will ask
 * the user to input information for the task, and pass this to the DB
 */
import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native'

import { firebaseApp } from '../../firebase'
import * as firebase from 'firebase';


export default class create_new extends Component {

  /**
   * Constructor
   */
  constructor(props) {
      super(props)

      this.state = {
        postStatus: null,
        postText: '',
        postPrice: '',
        postPrice: '',
      }
      if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true)
      }
    }

    componentDidUpdate() {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    }

    /**
     * Main entry point, displays all input fields to UI
     */
    render() {
      return (
        <View style={styles.container} >

          <Text style={[styles.title, { paddingTop: 15}]}>
            {'Create a new Task '.toUpperCase()}
          </Text>
          <Text style={styles.message}>{this.state.postStatus}</Text>
          <Text style={[styles.title2, { marginBottom: 0 }]}>
            {'Enter Task Details: '.toUpperCase()}
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
            multiline={true}
            style={styles.inputField}
            underlineColorAndroid='transparent'
            placeholder='Your Task...'
            value={this.state.postText}
            onChangeText={(text) => this.setState({ postText: text })}
            placeholderTextColor='rgba(0,0,0,.6)'
            />
          </View>

          <Text style={styles.title2}>
            {'Reward offered: '.toUpperCase()}
          </Text>
          <View style={styles.inputContainer2}>
            <TextInput
            multiline={true}
            style={styles.inputField}
            underlineColorAndroid='transparent'
            placeholder='$'
            value={this.state.postPrice}
            onChangeText={(text) => this.setState({ postPrice: text })}
            placeholderTextColor='rgba(0,0,0,.6)'
            />
          </View>

          <Text style={styles.title2}>
            {'Enter location of Task: '.toUpperCase()}
          </Text>
          <View style={styles.inputContainer2}>
            <TextInput
            multiline={true}
            style={styles.inputField}
            underlineColorAndroid='transparent'
            placeholder='location'
            value={this.state.postLocation}
            onChangeText={(text) => this.setState({ postLocation: text })}
            placeholderTextColor='rgba(0,0,0,.6)'
            />
          </View>

          <TouchableOpacity style={styles.btnContainer} onPress={this._handleNewPost.bind(this)}>
            <Text style={styles.btnText}>POST TASK</Text>
          </TouchableOpacity>
        </View>

      )
    }

    /**
     * Database functions that take data from input fields
     * and passes it into the database
     */
    _handleNewPost() {
      this.setState({
        postStatus: 'Posting Task...'
      })

      /**
       * checks data is entered correctly in input fields, gets time, userID
       * email and post key
       */
      if (this.state.postText.length > 20 && this.state.postPrice.length > 1
      && this.state.postLocation.length > 5) {
        const time = Date.now()
        const uid = firebaseApp.auth().currentUser.uid;
        const email = firebaseApp.auth().currentUser.email;
        const newPostKey = firebase.database().ref().child('posts').push().key

        /**
         * data being posted into the database, name, time, text, price loc
         */
        const postData = {
          name: firebaseApp.auth().currentUser.displayName,
          time: time,
          text: this.state.postText,
          price: this.state.postPrice,
          location: this.state.postLocation,
          puid: newPostKey
        }

        let updates = {}
        updates['/posts/' + newPostKey] = postData
        updates['/users/' + uid + '/posts/' + newPostKey] = postData

        /**
         * creates post status for UI depending on state
         */
        firebase.database().ref().update(updates).then(() => {
          this.setState({ postStatus: 'Your task has been posted! ', postText: '', postPrice: '' })
        }).catch(() => {
          this.setState({ postStatus: 'Something went wrong!!!' })
        })
      } else {
        this.setState({ postStatus: 'Please input information on all fields.' })
      }

      setTimeout(() => {
        this.setState({ postStatus: null })
      }, 2000)
    }
  }

  /**
   * Styles used for UI and fields. Sort of like CSS but not CSS.
   */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    height: 65,
    borderRadius: 2,
    backgroundColor: '#FFAD2B',
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 24,
  },
  title2: {
    marginTop: 15,
    fontSize: 14,
    color: 'black',
    textAlign: 'left',
    marginLeft: 10,
    marginRight: 10,
  },
  message: {
    textAlign: 'left',
    paddingTop: 1,
    paddingBottom: 0
  },
  inputContainer: {
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(255,255,255,.6)',
    marginBottom: 0,
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 7,
    borderColor: '#FDEBD0',
    borderRadius: 10,
    height: 200
  },
  inputContainer2: {
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(255,255,255,.6)',
    marginBottom: 10,
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 7,
    borderColor: '#FDEBD0',
    borderRadius: 10,
    height: 45
  },
  inputField: {
    flex: 1,
    padding: 0,
    textAlignVertical: 'top',
    width: 380,
    height: 40,
    paddingLeft: 0,
    paddingRight: 15,
  },
  btnContainer: {
    width: 120,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingBottom: 5,
    backgroundColor: '#FFAD2B',

  },
  btnText: {
    fontSize: 15,
    color: 'white',
  }
});
