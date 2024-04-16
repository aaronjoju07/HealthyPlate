import { useStripe } from '@stripe/stripe-react-native';
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Modal, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const restaurantNames = cartItems.map(item => item.restaurantName);
  const restaurantImage = cartItems.map(item => item.restaurantImage);
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
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
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
        customerEmail: user.email, // Replace with actual customer email
        customerAddress: deliveryAddress,
        items: cartItems.map(item => ({
          dishName: item.dish.dishName,
          dishImage: item.dish.imageUrl, // Assuming dish image URL is available in item.dish.dishImage
          quantity: item.quantity,
          price: item.dish.price,
        })),
        totalAmount: totalSum,
        restaurantName: restaurantNames[0], // Assuming restaurant name is available in item.restaurantName
        restaurantImage: restaurantImage[0], // Assuming restaurant image URL is available in item.restaurantImage

      };

      const createdOrderResponse = await axios.post(`${process.env.URL}/orders`, orderData);
      if (createdOrderResponse.data.status === 'Success') {
        setIsSuccessModalVisible(true);

      } else {
        Alert.alert('Something went wrong', 'Failed to create order!');
      }
    } catch (error) {
      Alert.alert('Something went wrong', 'Failed to create order');
    }
  };
  const handleSuccessModalClose = () => {
    setIsSuccessModalVisible(false);
    navigation.navigate('Home');
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
            <Image source={{ uri: item.dish.imageUrl }} style={styles.menuImage} />
            <View style={styles.itemDetails}>
              <Text>{item.dish.dishName}</Text>
              <Text>Quantity: {item.quantity}</Text>
            </View>
          </View>

        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ₹{roundedTotal}</Text>
      </View>
      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>

      {/* Modal for collecting delivery address */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <Image source={require('../../../assets/location.png')} style={{ height: 250, width: 345 }} />
          <TextInput
            style={styles.input}
            placeholder="Enter delivery address"
            value={deliveryAddress}
            onChangeText={setDeliveryAddress}
          />
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
            <Text style={styles.confirmButtonText}>Confirm Address</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.backButton}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal visible={isSuccessModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <Image source={require('../../../assets/Animations/order.gif')} style={{ height: 200, width: 250 }} />
          <Text style={styles.successMessage}>Order placed successfully!</Text>
          <Text style={styles.successMessage}>Payment successful.</Text>
          <Text style={{ fontSize: 16 }}>Your order has been placed.</Text>
          <TouchableOpacity style={styles.okButton} onPress={handleSuccessModalClose}>
            <Text style={styles.okButtonText}>OK</Text>
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
  backButtonText: {
    fontSize: 16,
    margin: 10
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 100
  },
  itemDetails: {
    flex: 1,
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
    backgroundColor: 'white',
  },
  successMessage: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  okButton: {
    backgroundColor: 'rgba(255, 199, 0, 1)',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center', margin: 15
  },
  okButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
