import React, { Component } from 'react'
import {
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

var {height, width} = Dimensions.get('window');



export default class NavigationTab extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    /**
     * Builds a tab for UI
     */
    return (
      <View style={styles.tabs}>
        {this.props.tabs.map((tab, i) => {
          return (
            <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
              <Icon
                name={tab}
                size={30}
                color={this.props.activeTab === i ? '#FFAD2B' : '#FDEBD0'}

              />
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

}
/**
 * UI Styling
 */
const styles = StyleSheet.create({
  tabs: {
  height: 60,
  flexDirection: 'row',
  backgroundColor: '#ffffff',
  paddingTop: 0,
  width: Dimensions.get('window').width,
  },
  titleContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20
  },
  title: {
    fontSize: 30,
    color: '#ffffff'
  },
  tab: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
