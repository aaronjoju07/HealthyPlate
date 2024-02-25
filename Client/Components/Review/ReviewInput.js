import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import * as Icon from 'react-native-feather';

const ReviewInput = () => {
  const [userReview, setUserReview] = useState({
    comment: '',
    rating: 0,
  });

  const [modalVisible, setModalVisible] = useState(false);

  const handleReviewSubmit = () => {
    // Implement your logic for submitting the review here
    // ...

    // Close the modal after submitting the review
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addReviewButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Add Review</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.reviewInputContainer}>
            <Text style={styles.reviewInputLabel}>Your Review:</Text>
            <TextInput
              style={styles.reviewInput}
              placeholder="Write your review here"
              value={userReview.comment}
              onChangeText={(text) => setUserReview({ ...userReview, comment: text })}
              multiline
            />
            <Text style={styles.reviewInputLabel}>Rating (1-5):</Text>
            <View style={styles.ratingContainer}>
              <TextInput
                style={styles.ratingInput}
                placeholder="Rate"
                value={userReview.rating.toString()}
                onChangeText={(text) => setUserReview({ ...userReview, rating: parseInt(text) || 0 })}
                keyboardType="numeric"
              />
              <Text>/5</Text>
            </View>
            <TouchableOpacity
              style={styles.submitReviewButton}
              onPress={handleReviewSubmit}
            >
              <Text style={styles.buttonText}>Submit Review</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Icon.XCircle size={30} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addReviewButton: {
      backgroundColor: 'rgba(255, 199, 0, .91)',
      padding: 10,
      borderRadius: 8,
      width: '90%',
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      padding: 20,
    },
    reviewInputContainer: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
    },
    reviewInputLabel: {
      fontSize: 16,
      marginBottom: 5,
    },
    reviewInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      minHeight: 100,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    ratingInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      flex: 1,
    },
    submitReviewButton: {
      backgroundColor: '#27ae60',
      padding: 10,
      borderRadius: 5,
    },
    closeModalButton: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
  };
export default ReviewInput;
