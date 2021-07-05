/**
 * timeline UI that displays all posts from every user in the database.
 */

import React, { Component } from 'react'
import {
  Text,
    View,
    StyleSheet,
    ScrollView,
    LayoutAnimation,
    Platform,
    UIManager,
    RefreshControl
} from 'react-native'

import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'
import { savePosts } from '../../actions'
import { firebaseApp } from '../../firebase'
import Post from './post'

class Timeline extends Component

{
  constructor(props) {
    super(props)

    this.state = {
      isRefreshing: false,
      updateNotification: null
    }
  }

  /**
   * database functions
   */
  componentDidMount() {
    firebaseApp.database().ref('posts/').once('value').then((snapshot) => {
      this.props.savePosts(snapshot.val())
    }).catch(() => { })

    setTimeout(() => {
      this.setState({ updateNotification: 'Pull to refresh...' })
    }, 10000)
  }

  componentDidUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
  }

  _onRefresh() {
    this.setState({ isRefreshing: true })

    firebaseApp.database().ref('posts/').once('value').then((snapshot) => {
      this.props.savePosts(snapshot.val())
      this.setState({isRefreshing: false, updateNotification: null})
    })
  }

  render() {
    const notify = this.state.updateNotification ?
    <Text style={styles.updateNotificationStyle}>
      {this.state.updateNotification}
    </Text>
    : null

    const view = this.props.posts ?
      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={this.state.isRefreshing}
          onRefresh={this._onRefresh.bind(this)}
          tintColor="#6AD176"
          title="Loading..."
          titleColor="#6AD176"
          colors={['#FFAD2B']}
          progressBackgroundColor={'#ffffff'}
        />
      }>

      {notify}

      {this.renderPosts()}

      </ScrollView>

    :
    <View style={styles.waitView}>
      <Text>Getting universal timeline...</Text>
    </View>

    return (
      <View style={styles.container}>
      <Text style={[styles.title, { paddingTop: 15}]}>
        {'Timeline'.toUpperCase()}
      </Text>
        {view}
      </View>
    )
  }

  /**
   * renders tasks, uses array
   */
  renderPosts() {
    const postArray = []
    _.forEach(this.props.posts, (value, index) => {
      const time = value.time
      const timeString = moment(time).fromNow()
      postArray.push(
        <Post
        posterName={value.name}
        postTime={timeString}
        postContent={"\n"+value.text+"\n"}
        postPrice={value.price}
        postLocation={value.location}
        key={index}
        />
      )
    })
    _.reverse(postArray)
    return postArray
  }
}

/**
 * styling
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  waitView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 2,
    backgroundColor: '#ffffff',
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10
  },
  name: {
    fontSize: 25,
  },
  time: {
    fontSize: 12,
    paddingBottom: 10
  },
  content: {
    color: 'rgba(0,0,0,.8)',
    fontSize: 14
  },
  updateNotificationStyle: {
    textAlign: 'center',
    marginTop: 10,
    paddingBottom: 5
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
    posts: state.posts
  }
}
export default connect(mapStateToProps, {savePosts})(Timeline)
