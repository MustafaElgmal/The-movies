import { FilmType } from "./../../types";
import { Film } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../../types";

const initialState: { popularFilms: Movie[]; FilterFilms: FilmType[] } = {
  popularFilms: [],
  FilterFilms: [],
};

export const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    setPopularFilms: (state, action: PayloadAction<Movie[]>) => {
      state.popularFilms = action.payload;
    },
    setFilterFilms: (state, action: PayloadAction<FilmType[]>) => {
      state.FilterFilms = action.payload;
    },
  },
});

export const { setFilterFilms, setPopularFilms } = filmsSlice.actions;
export default filmsSlice.reducer;
