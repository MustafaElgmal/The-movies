import { FilmType } from './../../types';
import { Film } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../../types";

const initialState: { popularFilms: FilmType[]; films: Film[] } = {
  popularFilms: [],
  films: [],
};

export const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    setPopularFilms: (state, action: PayloadAction<FilmType[]>) => {
      state.popularFilms = action.payload;
    },
    setFilms: (state, action: PayloadAction<Film[]>) => {
      for (let i = 0; i < action.payload.length; i++)
        state.films.push(action.payload[i]);
    },
  },
});

export const {setFilms,setPopularFilms} = filmsSlice.actions;
export default filmsSlice.reducer;
