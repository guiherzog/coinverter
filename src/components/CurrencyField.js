import React, { Component } from 'react';
import { TextInput, Text, View, StyleSheet, Image } from 'react-native';
import _ from 'lodash';
import getSymbolFromCurrency from 'currency-symbol-map'

import Colors from '../theme/colors';
import currencyToCountry from '../utils/currencyToCountry';

export default class CurrencyField extends Component {
  getCorrespondingCurrency = (value) => {
     const convertedValue = _.round(value*this.props.rate, 2);
     return `${convertedValue}`;
  }

  onChangeText = (value) => {
    // Recalculates the baseValue corresponding to the modified input.
    return this.props.onChangeText(_.round(value/this.props.rate));
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.symbol}>{getSymbolFromCurrency(this.props.currency)}</Text>
        <TextInput
          textAlign={'left'}
          onChangeText={value => this.onChangeText(value)}
          keyboardType='numeric' 
          underlineColorAndroid='rgba(0,0,0,0)' // To remove underline on Android
          value={this.getCorrespondingCurrency(this.props.baseValue)}
          style={styles.input}
        />
        <View style={styles.details}>
          <Text style={styles.countryName}>{currencyToCountry[this.props.currency][0].Country}</Text>
          <Text style={styles.currencyName}>{currencyToCountry[this.props.currency][0].Currency}</Text>
        </View>
        <Image 
          style={styles.flag}
          resizeMode={Image.resizeMode.cover}
          source={{uri:`http://www.countryflags.io/${currencyToCountry[this.props.currency][0].CountryCode}/flat/64.png`}} 
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
    marginBottom: 5,
    borderColor: Colors.gray,
    borderWidth: 0.25,
    backgroundColor: Colors.white,
    shadowOffset:{width: 0.5, height: 0.5},
    shadowColor: Colors.black,
    shadowOpacity: 0.05,
    height: 60,
  },
  symbol: {
    marginLeft: 10,
    fontSize: 20,
    minWidth: 30,
    color: Colors.darkGray,
  },
  flag: {
    margin: 10,
    height: 40,
    width: 40,
  },
  countryName:{
    fontSize: 20,
    color: Colors.black,
    textAlign: 'right',
  },
  currencyName:{
    fontSize: 14,
    color: Colors.darkGray,
    textAlign: 'right',
  },
  input: {
    height: '100%',
    fontWeight: '600',
    flex: 1,
    marginLeft: 3,
    marginRight: 10,
    color: Colors.black,
    fontSize: 28,
    paddingHorizontal: 5,
    textAlign: 'left',
    backgroundColor: Colors.lightGray,
  }
});
