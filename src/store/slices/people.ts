import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { FavoriteService } from '@services';

import { Gender, IPeople } from '@types';
import { RootState } from '..';

type FilterByGender = 'All' | 'Male' | 'Female' | 'Other';

export interface State {
  people: Array<IPeople>;
}

const initialState: State = {
  people: []
};

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<Array<IPeople>>) => {
      state.people = action.payload;
    },
    toggleFavoriteCharacter: (state, action: PayloadAction<IPeople>) => {
      const findIndex = state.people.findIndex(
        (p) => p.url === action.payload.url
      );

      if (findIndex !== -1) {
        const updatedPeople = [...state.people];
        updatedPeople.splice(findIndex, 1);
        state.people = updatedPeople;
      } else {
        state.people = [action.payload, ...state.people];
      }

      FavoriteService.toggleFavorite(action.payload);
    }
  }
});

const selectSelf = (state: RootState) => state.people;

export const selectLengthByGender = createSelector(selectSelf, (state) => {
  return [
    { label: 'All', count: state.people.length },
    {
      label: 'Male',
      count: state.people.filter((p) => p.gender === Gender.Male).length
    },
    {
      label: 'Female',
      count: state.people.filter((p) => p.gender === Gender.Female).length
    },
    {
      label: 'Others',
      count: state.people.filter(
        (p) => p.gender === Gender.Unknown || p.gender === Gender.NA
      ).length
    }
  ];
});

export const selectCharactersByGender = createSelector(
  [
    (state: RootState) => state.people.people,
    (_, gender: FilterByGender) => gender
  ],
  (items, gender) => {
    if (gender === 'All') {
      return items;
    }

    return items.filter((i) => {
      if (gender === 'Male') {
        return i.gender === Gender.Male;
      }
      if (gender === 'Female') {
        return i.gender === Gender.Female;
      }

      return i.gender === Gender.Unknown || i.gender === Gender.NA;
    });
  }
);

export const { toggleFavoriteCharacter, setFavorites } = peopleSlice.actions;

export default peopleSlice.reducer;
