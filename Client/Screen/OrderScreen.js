import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, Button, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';

const OrderScreen = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    fetchOrders(); // Fetch orders when component mounts
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${process.env.URL}/orders/${user.email}`);
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleOrderPress = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleOrderPress(item)}>
  <View style={styles.orderItem}>
    <Image source={{ uri: item.restaurantImage }} style={styles.restaurantImage} />
    <View style={styles.orderDetails}>
      <Text style={styles.restaurantName}>{item.restaurantName}</Text>
      <Text>Total: ${item.totalAmount.toFixed(2)}</Text>
      <Text>Status: {item.orderStatus}</Text>
    </View>
  </View>
</TouchableOpacity>

  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>My Orders</Text>

      {/* Render orders or display no orders image */}
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={item => item._id}
        />
      ) : (
        <View style={styles.noOrdersContainer}>
          <Image source={require('../assets/noOrder.png')} style={styles.noOrdersImage} />
          <Text style={styles.noOrdersText}>No orders found</Text>
        </View>
      )}

      {/* Modal for detailed order view */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Order Details</Text>
            {selectedOrder && (
              <View>
                <Text>Restaurant: {selectedOrder.restaurantName}</Text>
                <Text>Total Amount: ${selectedOrder.totalAmount.toFixed(2)}</Text>
                <Text>Status: {selectedOrder.orderStatus}</Text>
                <Text>Items:</Text>
                <FlatList
                  data={selectedOrder.items}
                  renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                      <Text>{item.dishName}</Text>
                      <Text>${item.price}</Text>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            )}
            <Button title="Close" onPress={closeModal} color="red" />
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
    borderRadius:10,
    
  },
  restaurantImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25, // Rounded corners
  },
  orderDetails: {
    flex: 1,
  },
  restaurantName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noOrdersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOrdersImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  noOrdersText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // White background with transparency
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default OrderScreen;
