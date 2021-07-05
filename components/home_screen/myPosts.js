/**
 * View for My posts UI, that will display a list of all Tasks
 * that have been posted in the DB. Will display a counter and user name.
 * User will have the ability to delete task from DB.
 */

import React from 'react';
import {
  Text,
  View,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native'

import { connect } from 'react-redux'
import Post from './post'
import _ from 'lodash'
import { firebaseApp } from '../../firebase'
import moment from 'moment'


 class MyPosts extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: {},
      postsCount: 0
    }
  }

  /**
   * database func. Checks number of posts from the user
   */
  componentDidMount() {
    const userUid = this.props.currentUser.uid

    firebaseApp.database().ref('/users/' + userUid + '/posts/').on('value', (snapshot) => {
      this.setState({posts: snapshot.val(), postsCount: _.size(snapshot.val())})
    })
  }

  /**
   * Renders User name, number of tasks posted, and tasks listed. 
   */
  render() {
    return (
      <View style={styles.container}>
      <Text style={[styles.title, { paddingTop: 15}]}>
        {'My Tasks'.toUpperCase()}
      </Text>
        <View style={styles.profileInfoContainer}>
          <View style={styles.profileNameContainer}>
            <Text style={styles.profileName}>
              {this.props.currentUser.name}
            </Text>
          </View>
          <View style={styles.profileCountsContainer}>
            <Text style={styles.profileCounts}>
              {this.state.postsCount}
            </Text>
            <Text style={styles.countsName}>
              Tasks
            </Text>
          </View>
        </View>

        <ScrollView styles={styles.postContainer}>
          {this.renderPosts()}
        </ScrollView>
      </View>
    )
  }

  /**
   * Pulls taks from database and renders then into UI using Post.js
   * to create a post. Done for each post that exist for that user in the dtabase.
   */
  renderPosts() {
    const postArray = []
    _.forEach(this.state.posts, (value, index) => {
      const time = value.time
      const timeString = moment(time).fromNow()
      postArray.push(
        <TouchableOpacity
        onLongPress={this._handleDelete.bind(this, value.puid)}
        key={index}
        >
          <Post
          posterName={value.name}
          postTime={timeString}
          postContent={"\n" + value.text+"\n"}
          postPrice={value.price}
          postLocation={value.location}
          />
        </TouchableOpacity>
      )
    })
    _.reverse(postArray)

    /**
     * Returns posts
     */
    return postArray
  }

  /**
   * Delete function, will warn user about deletion
   */
  _handleDelete(puid) {
    Alert.alert(
      'Delete Task',
      'Are you sure you would like this task deleted?',
      [
        {text: 'Yes', onPress: () => this._deleteConfirmed(puid) },
        {text: 'No'}
      ]
    )
  }
  /**
   * deletes post from user
   */
  _deleteConfirmed(puid) {
    firebaseApp.database().ref('/posts/' + puid).remove()
    firebaseApp.database().ref('/users/' + this.props.currentUser.uid + '/posts/' + puid).remove()
  }
}

/**
 * styling code
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileInfoContainer: {
    flexDirection: 'row',
    height: 65,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 2,
    backgroundColor: '#FFAD2B',
  },
  profileNameContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  profileName: {
    marginLeft: 20,
    fontSize: 20,
    color: 'white',
  },
  profileCountsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5
  },
  profileCounts: {
    fontSize: 30,
    color: '#ffffff'
  },
  countsName: {
    fontSize: 12,
    color: '#ffffff'
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
})

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(MyPosts)
