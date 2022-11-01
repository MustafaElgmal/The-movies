/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { classNames } from "../../constants";
import { StarIcon } from "@heroicons/react/20/solid";
import { GetServerSideProps } from "next";
import { prisma } from "../../lib/prisma";
import { AppProps } from "../../types";
import Header from "../../components/header";
import { calcRate, updateFollowButton } from "../../utils/functions";
import { followUser } from "../../utils/apis";
import { useAppSelector } from "../../redux/app/hookes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const User = ({ user, followings }: AppProps) => {
  const [isFollow, setIsFollow] = useState(false);
  const profile = useAppSelector((state) => state.profileSlice.profile);
  const isLoggedIn = useAppSelector((state) => state.profileSlice.isLoggedIn);
  const router = useRouter();
  useEffect(() => {
    updateFollowButton(user?.followers!, profile.id, setIsFollow);
  }, []);
  return (
    <div className="bgcolor min-h-screen">
      <Header />
      <div className="sm:flex sm:justify-between  mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
        <div className="flex  space-x-10">
          <div>
            <img
              src={`${
                user?.imageUrl
                  ? user.imageUrl
                  : "https://gdbgnlodeaeojoowuqoc.supabase.co/storage/v1/object/sign/images/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvMzYwX0ZfMzQ2ODM5NjgzXzZuQVB6YmhwU2tJcGI4cG1Bd3Vma0M3YzVlRDd3WXdzLmpwZyIsImlhdCI6MTY2NjczODk5NiwiZXhwIjoxOTgyMDk4OTk2fQ.m8DMrMAaUazk13SE5o18af1ECIG400iofEsZ_M3_Jvk"
              }`}
              alt="Profile"
              className="h-40 w-40   rounded-full bg-gray-100"
            />
          </div>
          <div>
            <h1 className="text-white text-2xl font-bold">{user?.fullName}</h1>
            <button
              type="button"
              className="mt-5 px-5 py-2 bg-gray-500 text-gray-300 uppercase hover:bg-gray-400 hover:text-white"
              onClick={() => {
                isLoggedIn
                  ? followUser(
                      { userId: user?.id!, followerId: profile.id },
                      isFollow
                    )
                  : router.push("/signin");
              }}
            >
              {isFollow ? "UnFollow" : "Follow"}
            </button>
          </div>
        </div>
        <div className=" pt-20 sm:pt-0 flex py-10 sm:py-20 space-x-6">
          <div className="border-r px-5 ">
            <span className="flex justify-center text-gray-500 font-extrabold text-xl">
              {followings?.length}
            </span>
            <h1 className="text-gray-700">Following</h1>
          </div>
          <div>
            <span className="flex justify-center text-gray-500 font-extrabold text-xl">
              {user?.followers?.length}
            </span>
            <h1 className="text-gray-700">Followers</h1>
          </div>
        </div>
      </div>
      {isFollow ? (
        <div className="mx-auto px-6   max-w-7xl   sm:px-6 lg:px-8 lg:gap-20 pb-5 pt-10">
          <h3 className="text-gray-500 pb-3">FAVORITE FILMS</h3>
          <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            {user?.favoriteFilms?.map((film) => (
              <Link key={film.id} href={`/films/${film.id}`}>
                <div className="group relative border-r border-b border-gray-200 p-4 sm:p-6 cursor-pointer">
                  <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                    <img
                      src={`https://image.tmdb.org/t/p/w780/${film.film.profilePath}`}
                      alt="Photo"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="pt-10 pb-4 text-center">
                    <h3 className="text-sm font-medium text-gray-900">
                      <a className="hover:text-white">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {film.film.name}
                      </a>
                    </h3>
                    <div className="mt-3 flex flex-col items-center">
                      <p className="sr-only">
                        {calcRate(film.film.rates)} out of 5 stars
                      </p>
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              calcRate(film.film.rates) > rating
                                ? "text-yellow-400"
                                : "text-gray-200",
                              "flex-shrink-0 h-5 w-5"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {film.film.raviews.length} reviews
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center text-white font-bold text-xl uppercase pt-5">
          This account is privite
        </div>
      )}
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.userId;
  const user = await prisma.user.findFirst({
    where: { id: id as string },
    include: {
      favoriteFilms: {
        include: { film: { include: { raviews: true, rates: true } } },
      },
      followers: true,
    },
  });
  const followings = await prisma.follower.findMany({
    where: { followerId: id as string },
  });
  return {
    props: { user, followings },
  };
};

export default User;
