import { generateIndex } from './functions';
import { FilmType, Movie, UserCreate } from "./../types";
import { Base_Url } from "./../constants/index";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { setPopularFilms } from "../redux/features/filmsSlice";

export const getCategoriesFromMovieApi = async () => {
  let categories: { id: number; name: string }[];
  try {
    const res = await axios.get(
      `${Base_Url}/genre/movie/list?api_key=${process.env.MOVIE_KEY}&language=en-US`
    );
    categories = res.data.genres;
  } catch (e) {
    throw e;
  }
  return categories;
};

export const getFilmsFromMovieApi = async () => {
  let films: Movie[] = [];
  // try {
  //   for (let i =1; i <= 500; i++) {
  //     const res = await axios.get(
  //       `${Base_Url}/discover/movie?api_key=${process.env.MOVIE_KEY}&page=${i}`
  //     );
  //     for (let j = 0; j < res.data.results.length; j++) {
  //       films.push(res.data.results[j]);
  //     }
  //   }
  // } catch (e) {
  //   throw e;
  // }

  return films;
};

export const createUser = async (user: UserCreate) => {
  try {
  } catch (e) {
    console.log(e);
  }
};

export const signInUser = async (user: { email: string; password: string }) => {
  try {
  } catch (e) {
    console.log(e);
  }
};

export const getCategories = async (setCategories: Function) => {
  try {
    const res = await axios.get("/api/categories");
    setCategories(res.data.categories);
  } catch (e) {
    console.log(e);
  }
};
export const getFilms = async (pageNo: number) => {
  try {
    const res = await axios.get(`/api/films?page=${pageNo}`);
  } catch (e) {
    console.log(e);
  }
};

export const getPopularFilms = async (dispatch: Dispatch,pageNo:number,setImageUrl:Function) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=95e2a5f099705dcdaa3ebd8f3e378742&page=${pageNo}&language=en-US`
    );
    dispatch(setPopularFilms(res.data.results));
    const imageUrl=res.data.results[generateIndex()].backdrop_path.split('/')
    setImageUrl(`https://image.tmdb.org/t/p/w780/${imageUrl[imageUrl.length-1]}`)
  } catch (e) {
    throw e;
  }
};
