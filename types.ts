import { Category, Film, User } from "@prisma/client";

export interface AppProps {
  categories?: Category[];
  film?:Film
  members?:User[]
  user?:User
}
export interface UserCreate {
  id: string;
  fullName: string;
  email: string;
  password: string;
}

export interface Movie {
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
}
export interface FilmType extends Movie{
  totalReviews:number,
  rating:number

}
