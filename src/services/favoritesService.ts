import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPeople } from '@types';

export const getAll = async () => {
  try {
    const allFavorites = await AsyncStorage.getItem('people');
    if (!allFavorites) return [];

    const parsedFavorites = JSON.parse(allFavorites);
    if (!parsedFavorites) return [];

    return parsedFavorites;
  } catch (e) {
    console.log(`Get all favorites error: `, e);
  }
};

export const toggleFavorite = async (character: IPeople) => {
  try {
    const allFavorites = await AsyncStorage.getItem('people');
    if (!allFavorites) {
      AsyncStorage.setItem('people', JSON.stringify([character]));
      return;
    }

    const updatedFavorites = JSON.parse(allFavorites);
    const findIndex = updatedFavorites.findIndex(
      (f: IPeople) => f.url === character.url
    );

    if (findIndex === -1) {
      AsyncStorage.setItem(
        'people',
        JSON.stringify([character, ...updatedFavorites])
      );
    } else {
      updatedFavorites.splice(findIndex, 1);
      AsyncStorage.setItem('people', JSON.stringify(updatedFavorites));
    }
  } catch (e) {
    console.log(`Toggle character favorite error: `, e);
  }
};

export const removeAll = async () => {
  try {
    AsyncStorage.removeItem('people');
  } catch (e) {
    console.log(`Remove all favorites error: `, e);
  }
};
