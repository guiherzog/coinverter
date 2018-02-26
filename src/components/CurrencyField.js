import React, { Component } from 'react';
import { TextInput, Text, View, StyleSheet, Image } from 'react-native';
import _ from 'lodash';

const countryToEuro = {
  BR: 4,
  US: 1.2,
  AU: 2,
  EU: 1,
}
export default class CurrencyField extends Component {
  getCorrespondingCurrency = (value, code) => {
     const convertedValue = _.round(value*countryToEuro[code], 2);
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
    width: '100%',
    marginBottom: 10,
    backgroundColor: "#07A0C3",
    shadowOffset:{width: 1, height: 1},
    shadowColor: '#07A0C3',
    shadowOpacity: 0.05,
    height: 80,
  },
  flag: {
    margin: 10,
    height: 60,
    width: 60,
    resizeMode: 'cover',
    borderRadius: 30,
    backgroundColor: 'red',
  },
  currencyCode:{
    fontSize: 26,
    color: 'white',
  },
  input: {
    height: '100%',
    flex: 1,
    marginHorizontal: 10,
    color: 'white',
    fontSize: 36,
    textAlign: 'right'
  }
});
