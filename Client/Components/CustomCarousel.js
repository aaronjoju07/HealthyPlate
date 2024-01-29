import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, Image } from 'react-native';
const { width, height } = Dimensions.get("window");
const CustomCarousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / Dimensions.get('window').width);
    setCurrentIndex(index);
  };

  const handlePagination = (index) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ animated: true, x: index * Dimensions.get('window').width });
    }
  };

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        ref={scrollRef}
      >
        {data.map((item, index) => (
          <View key={index} style={styles.carouselItem}>
            <Image style={styles.carouselImage} source={item.image} />
            {/* <View style={styles.carouselTextContainer}>
              <Text style={styles.carouselName}>{item.name}</Text>
              <Text style={styles.carouselLocation}>{item.location}</Text>
              <Text style={styles.carouselRating}>{`Rating: ${item.rating}`}</Text>
            </View> */}
          </View>
        ))}
      </ScrollView>
      <View style={styles.paginationContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[styles.paginationDot, index === currentIndex && styles.activeDot]}
            onTouchEnd={() => handlePagination(index)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 1,
    width:width
  },
  carouselItem: {
    marginLeft:3,
    marginRight:3,
    width: Dimensions.get('window').width,
    borderRadius: 20,
    overflow: 'hidden',
  },
  carouselImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  carouselTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  carouselName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  carouselLocation: {
    color: 'white',
    fontSize: 14,
  },
  carouselRating: {
    color: 'white',
    fontSize: 14,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    margin: 5,
  },
  activeDot: {
    backgroundColor: 'white',
  },
});

export default CustomCarousel;
