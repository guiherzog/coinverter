import React, { Component } from 'react';
import { TextInput, Text, View, StyleSheet, Image } from 'react-native';
import _ from 'lodash';
import getSymbolFromCurrency from 'currency-symbol-map'
import currency from 'currency.js';

import Colors from '../theme/colors';
import currencyToCountry from '../utils/currencyToCountry';

const isNotValid = (value) => {
  return false;
}

export default class CurrencyField extends Component {
  getCorrespondingCurrency = (value) => {
    if (value.slice(-1) == '.'){
      return `${_.round(value*this.props.rate, 0)}.`;
    }
    const convertedValue = _.round(value*this.props.rate, 2);
    return `${convertedValue}`;
  }

  shouldComponentUpdate(nextProps){
    console.log(isNotValid(nextProps.baseValue));
    if (isNotValid(nextProps.baseValue)){
      return false;
    }
    return true;
  }

  onChangeText = (value) => {
    let result;
    if (value.slice(-1) == '.'){
      result =`${_.round(value/this.props.rate, 0)}.`;
    } else {    
      const convertedValue = _.round(value/this.props.rate, 2);
      result = `${convertedValue}`;
    }
    this.props.onChangeText(result);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.symbol}>{getSymbolFromCurrency(this.props.currency)}</Text>
        <TextInput
          autoFocus={this.props.autoFocus}
          textAlign={'left'}
          onChangeText={value => this.onChangeText(value)}
          keyboardType='numeric' 
          underlineColorAndroid='rgba(0,0,0,0)' // To remove underline on Android
          value={this.getCorrespondingCurrency(this.props.baseValue)}
          style={styles.input}
        />
        <View style={styles.details}>
          <View style={styles.country}>
            <Text style={styles.countryName}>{currencyToCountry[this.props.currency][0].Country}</Text>
            <Image 
              style={styles.flag}
              source={{uri:`http://www.countryflags.io/${currencyToCountry[this.props.currency][0].CountryCode}/flat/64.png`}} 
            />
          </View>
          <Text style={styles.currencyName}>{currencyToCountry[this.props.currency][0].Currency}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '97%',
    borderRadius: 5,
    marginBottom: 5,
    borderColor: Colors.gray,
    borderWidth: 0.25,
    backgroundColor: Colors.white,
    shadowOffset:{width: 0.1, height: 0.1},
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    height: 60,
    backgroundColor: Colors.lightGray,
  },
  symbol: {
    marginLeft: 10,
    fontSize: 16,
    height: '100%',
    lineHeight: 60,
    fontWeight: '600',
    color: Colors.darkGray,
  },
  details: {
    padding: 5,
  },
  flag: {
    width: 30,
    height: 20,
    marginLeft: 5,
  },
  country:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  countryName:{
    fontSize: 16,
    color: Colors.black,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  currencyName:{
    fontSize: 14,
    color: Colors.darkGray,
    textAlign: 'right',
    fontWeight: '100',
  },
  input: {
    height: '100%',
    fontWeight: '600',
    flex: 1,
    marginRight: 10,
    color: Colors.black,
    fontSize: 28,
    paddingHorizontal: 2,
    textAlign: 'left',
  }
});
