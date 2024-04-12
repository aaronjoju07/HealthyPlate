import { useStripe } from '@stripe/stripe-react-native';
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Modal, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const navigation = useNavigation(); // Initialize useNavigation
  const user = useSelector((state) => state.user.user);
  // Calculate the total sum of the product of price and quantity
  const totalSum = cartItems.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  const roundedTotal = totalSum.toFixed(2);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handlePlaceOrder = async () => {
    setIsModalVisible(true);
  };
  const handleConfirmOrder = async () => {
    if (!deliveryAddress.trim()) {
      Alert.alert('Error', 'Please enter a valid delivery address');
      return;
    }
    setIsModalVisible(false);
    // Proceed with payment
    // 1. Create a payment intent
    const response = await axios.post(`${process.env.URL}/payment/intent`, {
      amount: totalSum,
    });
    if (response.error) {
      Alert.alert('Something went wrong', response.error);
      return;
    }
    // 2. Initialize the Payment sheet
    const { error: paymentSheetError } = await initPaymentSheet({
      merchantDisplayName: 'HealthyPlate, Inc.',
      paymentIntentClientSecret: response.data.paymentIntent,
      defaultBillingDetails: {
        name: user.username, // Use user.username if available
      },
    });
    if (paymentSheetError) {
      Alert.alert('Something went wrong', paymentSheetError.message);
      return;
    }
  
    const { error: paymentError } = await presentPaymentSheet();
  
    if (paymentError) {
      Alert.alert(`Error code: ${paymentError.code}`, paymentError.message);
      return;
    }
    try {
      const orderData = {
        customerName: user.username, // Replace with actual customer name
        customerEmail: `${user.username}@gmail.com`, // Replace with actual customer email
        customerAddress: deliveryAddress,
        items: cartItems.map(item => ({ 
          dishName: item.dish.dishName,
          quantity: item.quantity,
          price: item.dish.price
        })),
        totalAmount: totalSum
      };
      const createdOrderResponse = await axios.post(`${process.env.URL}/orders`, orderData);
      if (createdOrderResponse.data.status === 'Success') {
        Alert.alert('Order placed successfully', 'Payment successful. Order placed successfully', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Home');
            },
          },
        ]);
        
      } else {
        Alert.alert('Something went wrong', 'Failed to create order');
      }
    } catch (error) {
      Alert.alert('Something went wrong', 'Failed to create order');
    }
  };
// Card No : 4000003560000008
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
<View>
      {/* <Image source={require('../../../assets/Animations/bike.gif')} style={{ height: 200, width: 200 }} /> */}

</View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ₹{roundedTotal}</Text>
      </View>
      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>

      {/* Modal for collecting delivery address */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter delivery address"
            value={deliveryAddress}
            onChangeText={setDeliveryAddress}
          />
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
            <Text style={styles.confirmButtonText}>Confirm Address</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    width: '80%',
    marginBottom: 16,
  },
  confirmButton: {
    backgroundColor: 'rgba(255, 199, 0, 1)',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;
