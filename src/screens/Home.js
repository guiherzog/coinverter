import React, { Component } from 'react';
import { View, StatusBar, ScrollView, StyleSheet } from 'react-native';
import { Constants } from 'expo';

import Colors from '../theme/colors';
import CurrencyField from '../components/CurrencyField';
import IntroCard from '../components/IntroCard';
import _ from 'lodash';
import currency from 'currency.js';

export default class Home extends Component {
  state = {
    baseValue: 1,
    rates: [],
    updatedDate: null,
  }

  async componentWillMount(){
    await this.getExchangeRateFromAPI();
  }

  // Gets the exchange rate from the API
  getExchangeRateFromAPI = async () => {
    const result = await fetch('https://txf-ecb.glitch.me/rates');
    if (result.status === 200){
      const data = await result.json();
      this.setState({ rates: data.rates, updatedDate: data.time });
    }
  }
  
  // Recalculates the baseValue depending on the current focused currency.
  onChangeText = (baseValue) => {
    this.setState({ baseValue });
  }

  renderCurrencyFields = () => {
    const rates = [ ...this.state.rates ];

    const currencyFields = rates.map(item => {
      return (<CurrencyField
          key={`currency_${item.currency}`}
          currency={item.currency}
          rate={item.rate}
          baseValue={`${this.state.baseValue}`}
          onChangeText={this.onChangeText}
        />); 
    });

    return currencyFields;

  }
  
  render() {
    return (
      <View style={styles.main}>
        <StatusBar
          barStyle="light-content"
        />
        <IntroCard updatedDate={this.state.updatedDate} />
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <CurrencyField
            autoFocus
            key={`currency_EUR`}
            currency='EUR'
            baseValue={`${this.state.baseValue}`}
            rate={1}
            onChangeText={this.onChangeText} 
          />
          {this.renderCurrencyFields()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.green,
    paddingTop: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 10,
    alignItems: 'center',
    paddingBottom: 20,
  }
});