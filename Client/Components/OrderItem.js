import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Ensure you have this or a similar library installed.

const OrderItem = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Icon name="coffee" size={24} color="rgb(20, 83, 45)" />
        <Text style={styles.quantity}>2X</Text>
        <Text style={styles.name}>Burger</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e2e8f0',  // equivalent to bg-slate-200
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,  // equivalent to p-2
  },
  quantity: {
    paddingLeft: 8,  // equivalent to pl-2
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1d4ed8',  // equivalent to text-green-950
  },
  name: {
    fontWeight: '600',  // font-semi in Tailwind usually means semi-bold or 600
    fontSize: 18,
    color: '#1d4ed8',  // equivalent to text-green-950
  },
});

export default OrderItem;