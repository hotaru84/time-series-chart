import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CardState {
  image: string;
  title: string;
  subtitle: string;
  imageScale: number;
  imageTop: number;
  imageRight: number;
}

const initialState: CardState = {
  image: '',
  title: '',
  subtitle: '',
  imageScale: 1,
  imageTop: 0,
  imageRight: 0,
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    updateCard: (state, action: PayloadAction<CardState>) => {
      state.image = action.payload.image;
      state.title = action.payload.title;
      state.subtitle = action.payload.subtitle;
      state.imageScale = action.payload.imageScale;
      state.imageTop = action.payload.imageTop;
      state.imageRight = action.payload.imageRight;
    },
  },
});

export const { updateCard } = cardSlice.actions;

export default cardSlice.reducer;
