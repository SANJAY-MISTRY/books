import React from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';

const BookDetailsModal = ({ selectedBook, setSelectedBook }) => {
  if (!selectedBook) {
    return null;
  }

  const { volumeInfo } = selectedBook;
  const { title, description, publishedDate, publisher, imageLinks } = volumeInfo;

  return (
    <Modal visible={selectedBook !== null} animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={() => setSelectedBook(null)} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        {imageLinks && imageLinks.thumbnail ? (
          <Image style={styles.bookImage} source={{ uri: imageLinks.thumbnail }} />
        ) : (
          <View style={styles.defaultThumbnail}>
            <Image source={require('../images/book.png')} style={styles.thumbnailImage} />
          </View>
        )}
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalLabel}>Publication Date:</Text>
          <Text style={styles.modalText}>{publishedDate}</Text>
          <Text style={styles.modalLabel}>Publisher:</Text>
          <Text style={styles.modalText}>{publisher}</Text>
          <Text style={styles.modalLabel}>Description:</Text>
          <Text style={styles.modalText}>{description}</Text>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
    margin: 10,
  },
  closeButtonText: {
    fontWeight: 'bold',
    color: 'blue',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  modalLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalText: {
    marginBottom: 10,
  },
  bookImage: {
    width: 150,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
  },
  defaultThumbnail: {
    width: 150,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  thumbnailImage: {
    width: 150,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default BookDetailsModal;
