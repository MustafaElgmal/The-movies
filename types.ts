import {
  Category,
  FavoriteCategory,
  FavoriteFilm,
  Film,
  Follower,
  Rate,
  Review,
  User,
} from "@prisma/client";

export interface AppProps {
  categories?: Category[];
  film?: Film;
  members?: userType[];
  user?: userType;
  profile?: User;
  slidesPerView?: number;
  favoriteFilms?: FilmType[];
  followings?: Follower[];
  followers?: Follower[];
}
export interface UserCreate {
  id?: string;
  fullName: string;
  email: string;
  password: string;
}
export interface FilmType extends Film {
  raviews: Review[];
  rates: Rate[];
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

export interface userType extends User {
  favoriteCategories: FavoriteCategory[];
  favoriteFilms: favoriteFilmType[];
  followers: Follower[];
  followings: number;
  reviews:Review[]
}

export interface favoriteFilmType extends FavoriteFilm {
  film: FilmType;
}


