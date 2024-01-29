import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faMapMarkerAlt, faLocation } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <FontAwesomeIcon icon={faSearch} size={20} color="gray" />
          <TextInput placeholder='Search Restaurants' style={styles.input} />
          <View style={styles.locationContainer}>
            <FontAwesomeIcon icon={faLocation} size={20} color="gray" />
            <Text style={styles.locationText}>Bangalore</Text>
          </View>
        </View>
        <View style={[styles.filterButton, { backgroundColor: themeColor.bgColor(1) }]}>
          <Icon name="sliders-h" size={15} color="white" />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 4,
      paddingBottom: 2,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      paddingHorizontal: 3,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'gray',
    },
    searchInput: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
      padding: 3,
      borderRadius: 8,
    },
    input: {
      flex: 1,
      marginLeft: 2,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderLeftWidth: 2,
      paddingLeft: 2,
      borderLeftColor: 'gray',
    },
    locationText: {
      color: 'gray',
    },
    filterButton: {
      padding: 3,
      margin: 1,
      borderRadius: 999,
    },
  });

export default SearchBar;
