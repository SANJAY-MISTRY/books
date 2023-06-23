import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookDetailsModal from '../components/BookDetailsModal';

const FavoritesScreen = ({navigation}) => {
  const [favorites, setFavorites] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadFavorites();
    });
    return unsubscribe;
  }, [navigation]);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavorite = async (book) => {
    try {
      const updatedFavorites = favorites.filter((item) => item.id !== book.id);
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookDetails = (book) => {
    setSelectedBook(book);
  };

  const renderBookItem = ({ item }) => {
    const { id, volumeInfo } = item;
    const { title, authors, imageLinks } = volumeInfo;
    const thumbnail = imageLinks?.thumbnail;

    return (
      <TouchableOpacity style={styles.bookContainer}>
        {thumbnail ? (
          <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
        ) : (
          <View style={styles.defaultThumbnail}>
            <Image source={require('../images/book.png')} style={styles.thumbnailImage} />
          </View>
        )}
        <View style={styles.bookDetailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.authors}>
            <Text style={styles.label}>Author(s):</Text> {authors?.join(', ').slice(0, 30)}
            {authors?.join(', ').length > 30 ? '...' : ''}
          </Text>
          <TouchableOpacity onPress={() => handleBookDetails(item)}>
            <Text style={styles.seeMoreButtonText}>See More</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeFavorite(item)}
          >
            <Text style={styles.removeButtonText}>Remove from Favorites</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderBookItem}
        contentContainerStyle={styles.contentContainer}
      />
      <BookDetailsModal selectedBook={selectedBook} setSelectedBook={setSelectedBook} />
    </View>
  );
};

// Define the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'lightgray'
  },
  contentContainer: {
    paddingTop: 10,
  },
  bookContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  thumbnail: {
    width: 70,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  bookDetailsContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  authors: {
    marginBottom: 5,
  },
  defaultThumbnail: {
    width: 70,
    height: 100,
    marginRight: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  thumbnailImage: {
    width: 70,
    height: 100,
    borderRadius: 5,
  },
  seeMoreButtonText: {
    color: 'darkblue',
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
  },
  evenBackgroundColor: {
    backgroundColor: 'lightgray',
  },
  oddBackgroundColor: {
    backgroundColor: 'white',
  },
});

export default FavoritesScreen;
