import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate the total sum of the product of price and quantity
  const totalSum = cartItems.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  const roundedTotal = totalSum.toFixed(2);

  const handlePlaceOrder = () => {
    // Implement logic to place the order
    // For example, you can navigate to a checkout screen
    console.log('Placing Order...');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.dish.dishName}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text>{item.dish.dishName}</Text>
            <Text>Quantity: {item.quantity}</Text>
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${roundedTotal}</Text>
      </View>
      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 8,
    paddingBottom: 8,
  },
  totalContainer: {
    marginTop: 16,
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeOrderButton: {
    backgroundColor: 'rgba(255, 199, 0, 1)',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;
