import { generateIndex } from "./functions";
import { Movie, UserCreate } from "./../types";
import { Base_Url } from "./../constants/index";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { setFilterFilms, setPopularFilms } from "../redux/features/filmsSlice";
import { NextRouter } from "next/router";
import { setProfile } from "../redux/features/profileSlice";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const createUser = async (
  userr: UserCreate,
  router: NextRouter,
  supabaseClient: SupabaseClient<any, "public", any>
) => {
  try {
    await supabaseClient.auth.signUp({
      email: userr.email,
      password: userr.password,
    });

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: userr.email,
      password: userr.password,
    });

    const res = await axios.post("/api/users", { ...userr, id: data.user?.id });
    if (res.status === 201 && !error) router.push("/");
  } catch (e: any) {
    if (e.status !== 500) {
      alert(e.response.data[0].message);
    } else {
      console.log(e);
    }
  }
};

export const createUserWithFacebook = async (router: NextRouter) => {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options:{
        redirectTo:'/signin'
      }
    });
    if (data) {
      console.log(data)
      
    } else {
      alert("User is not found!");
      
    }
  } catch (e) {
    console.log(e);
  }
};

export const createUserWithGoogle = async (router: NextRouter) => {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (data) {
      router.push("/");
    } else {
      alert("User is not found!");
      router.push("/signin");
    }
  } catch (e) {
    console.log(e);
  }
};

export const signInUser = async (
  user: { email: string; password: string },
  router: NextRouter,
  supabaseClient: SupabaseClient<any, "public", any>
) => {
  try {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });
    const res = await axios.post("/api/users/signin", user);
    if (res.status === 201 && !error) router.push("/");
  } catch (e: any) {
    if (e.status !== 500) {
      if (e.response.status === 404) {
        alert("user not found!");
      } else {
        alert(e.response.data[0].message);
      }
    } else {
      console.log(e);
    }
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

export const getPopularFilms = async (
  dispatch: Dispatch,
  pageNo: number,
  setImageUrl: Function
) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=95e2a5f099705dcdaa3ebd8f3e378742&page=${pageNo}&language=en-US`
    );
    dispatch(setPopularFilms(res.data.results));
    let imageUrl: string =
      "https://a.ltrbxd.com/resized/sm/upload/q2/0n/4m/oh/pearl-1200-1200-675-675-crop-000000.jpg?v=0ed37f5964";
    if (res.data.results[generateIndex()].backdrop_path) {
      imageUrl = res.data.results[generateIndex()].backdrop_path.split("/");
    }

    setImageUrl(
      `https://image.tmdb.org/t/p/w780/${imageUrl[imageUrl.length - 1]}`
    );
  } catch (e) {
    throw e;
  }
};
export const getUserProfile = async (id: string, dispatch: Dispatch) => {
  try {
    const res = await axios.get(`/api/users/${id}`);
    dispatch(setProfile(res.data.user));
  } catch (e) {
    console.log(e);
  }
};

export const addPhoto = async (
  id: string,
  dispatch: Dispatch,
  supabaseClient: SupabaseClient<any, "public", any>,
  avatarFile: File
) => {
  try {
    const { data, error } = await supabaseClient.storage
      .from("images")
      .upload(`${Date.now()}${avatarFile.name}`, avatarFile, {
        cacheControl: "3600",
        upsert: false,
      });
    if (!error) {
      const { data: url } = supabaseClient.storage
        .from("images")
        .getPublicUrl(`${data.path}`);
      const res = await axios.post(`/api/users/photo/${id}`, {
        url: url.publicUrl,
      });

      dispatch(setProfile(res.data.user));
    }
  } catch (e) {
    console.log(e);
  }
};

export const getFilterFilms = async (
  pageNo: number,
  category: string,
  dispatch: Dispatch
) => {
  try {
    const res = await axios.get(
      `/api/films?page=${pageNo}&category=${category}`
    );
    dispatch(setFilterFilms(res.data.results));
  } catch (e) {
    console.log(e);
  }
};
export const followUser = async (
  follow: { userId: string; followerId: string },
  isFollow: boolean,
  setIsFollow: Function,
  SetFollower: Function,
  follower: number
) => {
  try {
    if (isFollow) {
      await axios.post("/api/unfollow", follow);
      SetFollower(follower - 1);
    } else {
      await axios.post("/api/follow", follow);
      SetFollower(follower + 1);
    }
    setIsFollow(!isFollow);
  } catch (e) {
    console.log(e);
  }
};

export const addReview = async (
  filmId: number,
  review: { text: string; userId: string }
) => {
  try {
    await axios.post(`/api/reviews/${filmId}`, review);
  } catch (e) {
    console.log(e);
  }
};

export const addRating = async (
  filmId: number,
  rate: { star: number; userId: string }
) => {
  try {
    await axios.post(`/api/rates/${filmId}`, rate);
  } catch (e) {
    console.log(e);
  }
};

export const addFavoriteFilms = async (favoriteFilm: {
  filmId: number;
  userId: string;
}) => {
  try {
    const res = await axios.post(`/api/users/favoritefilm`, favoriteFilm);
  } catch (e) {
    console.log(e);
  }
};
