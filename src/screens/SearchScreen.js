import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { MaterialIcons } from 'react-native-vector-icons';
import BookItem from '../components/BookItem';
import BookDetailsModal from '../components/BookDetailsModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    if (searchQuery) {
      fetchBooks();
    }
  }, [searchQuery]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`);
      setSearchResults(response.data.items || []);
    } catch (error) {
      console.log(error);
    }
  };

  const addToFavorites = async (book) => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      let favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];
      favoritesArray.push(book);
      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookDetails = (book) => {
    setSelectedBook(book);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Enter search query"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <BookItem
            item={item}
            index={index}
            handleBookDetails={handleBookDetails}
            handleAddToFavorites={addToFavorites}
          />
        )}
        contentContainerStyle={styles.contentContainer}
      />
      <BookDetailsModal selectedBook={selectedBook} setSelectedBook={setSelectedBook} />
    </View>
  );
};

SearchScreen.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ color, size }) => (
    <MaterialIcons name="search" size={size} color={color} />
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F9F9F9',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  contentContainer: {
    paddingTop: 10,
  },
});

export default SearchScreen;
