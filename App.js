import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import FavoritesScreen from './src/screens/FavoritesScreen';
import SearchScreen from './src/screens/SearchScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (book) => {
    setFavorites((prevFavorites) => [...prevFavorites, book]);
  };

  const removeFromFavorites = (book) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== book.id)
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Search">
          {(props) => (
            <SearchScreen {...props} addToFavorites={addToFavorites} />
          )}
        </Tab.Screen>
        <Tab.Screen name="Favorites">
          {(props) => (
            <FavoritesScreen
              {...props}
              favorites={favorites}
              removeFromFavorites={removeFromFavorites}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
