import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const OrderScreen = () => {
  const orders = [
    { id: '1', itemName: 'Burger', quantity: 2, price: '$10.00', status: 'Pending Delivery' },
    { id: '2', itemName: 'Pizza', quantity: 1, price: '$15.00', status: 'Delivered' },
    { id: '3', itemName: 'Pasta', quantity: 3, price: '$8.00', status: 'Pending Delivery' },
    // Add more orders as needed
  ];

  // Separate orders into Pending Delivery and Previous History
  const pendingDeliveryOrders = orders.filter(order => order.status === 'Pending Delivery');
  const previousHistoryOrders = orders.filter(order => order.status !== 'Pending Delivery');

  const renderOrderItem = (item) => (
    <TouchableOpacity key={item.id}>

    <View style={styles.orderItem}>
      <Image source={require('../assets/images/coverLogo.png')} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.itemName}</Text>
        <Text>Quantity: {item.quantity}</Text>
        <Text>Total Price: {item.price}</Text>
        <Text>Status: {item.status}</Text>
      </View>
      <FontAwesomeIcon icon={faChevronRight} size={24} color="rgba(255, 199, 0, 0.35)" />
    </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>


      {/* Pending Delivery Orders */}
      <View style={styles.sectionContainer}>
        <View style={styles.header}>
        <Text style={styles.sectionHeader}>Pending Delivery</Text>
        </View>
        <FlatList
          data={pendingDeliveryOrders}
          renderItem={({ item }) => renderOrderItem(item)}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.header}>
        <Text style={styles.sectionHeader}>Previous History</Text>
        </View>
        <FlatList
          data={previousHistoryOrders}
          renderItem={({ item }) => renderOrderItem(item)}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold', color: 'black'
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#c51717',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white', // Add a background color here
    borderColor: 'rgba(255, 199, 0, 0.35)',
    padding: 15,
    marginBottom: 10,
    margin: 9,
    borderRadius: 10,
    borderWidth: 2,
    // 3D shadow properties
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    // Android elevation (if needed)
    elevation: 0.5,
  },
  
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    margin: 10
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',

  },
});

export default OrderScreen;
