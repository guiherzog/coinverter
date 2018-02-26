import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';

import CurrencyField from '../components/CurrencyField';

export default class Home extends Component {
  state = {
    value: 12,
  }
  
  onChangeText = (value) => {
    this.setState({value});
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          CoinVerter
        </Text>
        <CurrencyField 
          country='EU' 
          value={this.state.value}
          onChangeText={this.onChangeText}
        />
        <CurrencyField 
          country='BR' 
          value={this.state.value}
          onChangeText={this.onChangeText}
        />
        <CurrencyField 
          country='US'
          value={this.state.value}
          onChangeText={this.onChangeText}
        />
        <CurrencyField 
          country='AU' 
          value={this.state.value}
          onChangeText={this.onChangeText}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#F9F9F9',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});