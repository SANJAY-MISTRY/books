import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './BookItemStyles';

const BookItem = ({ item, index, handleBookDetails, handleAddToFavorites }) => {
  const { volumeInfo } = item;
  const { title, authors, imageLinks } = volumeInfo;
  const thumbnail = imageLinks?.thumbnail;
  const backgroundColor = index % 2 === 0 ? styles.evenBackgroundColor : styles.oddBackgroundColor;

  return (
    <TouchableOpacity style={[styles.bookContainer, backgroundColor]} key={item.id}>
      {thumbnail ? (
        <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
      ) : (
        <View style={styles.defaultThumbnail}>
          <Image source={require('../images/book.png')} style={styles.thumbnailImage} />
        </View>
      )}
      <View style={styles.bookDetailsContainer}>
        <Text style={styles.title}>
          {title.length > 60 ? `${title.slice(0, 60)}...` : title}
        </Text>
        <Text style={styles.authors}>
          <Text style={styles.label}>Author(s):</Text> {authors?.join(', ').slice(0, 30)}
          {authors?.join(', ').length > 30 ? '...' : ''}
        </Text>
        <TouchableOpacity onPress={() => handleBookDetails(item)}>
          <Text style={styles.seeMoreButtonText}>See More</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addFavoritesButton}
          onPress={() => handleAddToFavorites(item)}
        >
          <Text style={styles.addFavoritesButtonText}>Add to Favorites</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

BookItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleBookDetails: PropTypes.func.isRequired,
  handleAddToFavorites: PropTypes.func.isRequired,
};

export default BookItem;
