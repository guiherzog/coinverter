import React, { Component } from 'react';
import { TextInput, Text, View, StyleSheet, Image } from 'react-native';
import _ from 'lodash';

import Colors from '../theme/colors';

const countryToEuro = {
  BR: 4,
  US: 1.2,
  AU: 2,
  EU: 1,
}

export default class CurrencyField extends Component {
  getCorrespondingCurrency = (value, code) => {
     const convertedValue = Number(value*countryToEuro[code]);
     return `${convertedValue}`;
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Image 
          style={styles.flag}
          resizeMode={Image.resizeMode.cover}
          source={{uri:`http://www.countryflags.io/${this.props.country}/flat/64.png`}} 
        />
        <Text style={styles.currencyCode}>{this.props.country}</Text>
        <TextInput
          onChangeText={text => this.props.onChangeText(text)}
          keyboardType='numeric' 
          underlineColorAndroid='rgba(0,0,0,0)' // To remove underline on Android
          value={this.getCorrespondingCurrency(this.props.value, this.props.country)}
          style={styles.input}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '95%',
    borderRadius: 5,
    marginBottom: 10,
    borderColor: Colors.gray,
    borderWidth: 0.25,
    backgroundColor: Colors.white,
    shadowOffset:{width: 0.5, height: 0.5},
    shadowColor: Colors.black,
    shadowOpacity: 0.05,
    height: 60,
  },
  flag: {
    margin: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  currencyCode:{
    fontSize: 26,
    color: Colors.black,
  },
  input: {
    height: '100%',
    flex: 1,
    marginHorizontal: 10,
    color: Colors.black,
    fontSize: 36,
    textAlign: 'right'
  }
});
