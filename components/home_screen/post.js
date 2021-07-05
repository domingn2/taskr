/**
 * individual post component, creates a post based on information, can be used as
 * an object to create many posts
 */

import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'


export default class Posts extends Component {

  /**
   * Constructor setting values at start
   */
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      Time: '',
     Content: ''
    }
  }

  /**
   * What a post will contain, name, time, content, price, location,
   */
  render() {
    return (
      <View style={styles.card}>
        <Text style={styles.name}>
          {this.props.posterName}
        </Text>
        <Text style={styles.time}>
          {this.props.postTime}
        </Text>
        <Text style={styles.content}>
        <Text style={styles.title}>Task: </Text>
          {this.props.postContent}
        </Text>
        <Text style={styles.price}>
          <Text style={styles.title}>Reward Offered: </Text>
          {this.props.postPrice}
        </Text>
        <Text style={styles.location}>
          <Text style={styles.title}>Location: </Text>
          {this.props.postLocation}
        </Text>
      </View>
    )
  }
}

/**
 * The style of a post, similat to CSS but not CSS 
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderWidth: 1,
    borderColor: '#FDEBD0',
    borderRadius: 2,
    backgroundColor: '#ffffff',
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10
  },
  name: {
    color: '#FFAD2B',
    fontSize: 15,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    paddingBottom: 10,
  },
  content: {
    color: 'rgba(0,0,0,.8)',
    fontSize: 14
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
  price: {
    color: 'black',
  },
  location: {
    color: 'black',
  }

})
