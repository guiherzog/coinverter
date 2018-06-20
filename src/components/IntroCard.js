import React, { Component } from 'react';
import { View, StatusBar, Text, ScrollView, StyleSheet } from 'react-native';
import Colors from '../theme/colors';

getFormattedDate = (date) => {
	if (!date)
		return '...';
	const jsDate = new Date(date);
	return `${jsDate.toLocaleDateString('de-DE')}`
}

export default IntroCard = ({updatedDate}) => (
    <View style={styles.intro}>
      <Text style={styles.paragraph}>
        Welcome to CoinVerter
      </Text>
      <Text style={styles.subtitle}>
        updated in {getFormattedDate(updatedDate)}
      </Text>
    </View>
)

const styles = StyleSheet.create({
	intro: {
    height: 75,
    alignItems: 'center',
  },
  paragraph: {
    marginTop: 24,
    marginBottom: 3,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.white,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '100',
    textAlign: 'center',
    color: Colors.white,
    opacity: 0.8,
  },
});