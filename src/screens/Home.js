import React, { Component } from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { Constants } from 'expo';

import CurrencyField from '../components/CurrencyField';

export default class Home extends Component {
  state = {
    baseValue: 1,
    rates: [],
  }

  async componentWillMount(){
    await this.getExchangeRateFromAPI();
  }

  getExchangeRateFromAPI = async () => {
    const result = await fetch('https://txf-ecb.glitch.me/rates');
    if (result.status === 200){
      const data = await result.json();
      this.setState({ rates: data.rates });
    }
  }
  
  onChangeText = (baseValue) => {
    this.setState({baseValue});
  }

  renderCurrencyFields = () => {
    const rates = [ ...this.state.rates];

    const currencyFields = rates.map(item => (
        <CurrencyField
          key={`currency_${item.currency}`}
          currency={item.currency}
          baseValue={this.state.baseValue}
          rate={item.rate}
          onChangeText={this.onChangeText}
        />
    ));

    return currencyFields;

  }
  
  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.paragraph}>
          CoinVerter
        </Text>
        <CurrencyField
          key={`currency_EUR`}
          currency='EUR'
          baseValue={this.state.baseValue}
          rate={1}
          onChangeText={this.onChangeText} 
        />
        {this.renderCurrencyFields()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#F9F9F9',
    paddingBottom: 50,
  },
  contentContainer: {
    alignItems: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});