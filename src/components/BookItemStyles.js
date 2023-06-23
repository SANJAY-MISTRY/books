import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
  addFavoritesButton: {
    width:140,
    backgroundColor: 'lightgreen',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addFavoritesButtonText: {
    fontWeight: 'bold',
    color:'#000'
  },
  defaultThumbnailText: {
    fontWeight: 'bold',
    color: 'black',
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
    height: 100, // Adjust the height as needed
    borderRadius: 5,
  },
  seeMoreButtonText: {  
    color: 'darkblue',
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

export default styles;
