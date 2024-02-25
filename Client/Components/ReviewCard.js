import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReviewCard = ({ comment, rating }) => {
  return (
    <View style={styles.reviewCard}>
      <Text style={styles.comment}>{comment}</Text>
      <Text style={styles.rating}>Rating: {rating}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewCard: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  comment: {
    fontSize: 16,
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    color: '#666666',
  },
});

export default ReviewCard;
