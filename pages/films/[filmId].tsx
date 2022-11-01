/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { StarIcon, HeartIcon } from "@heroicons/react/20/solid";
import { prisma } from "../../lib/prisma";
import { classNames, reviews } from "../../constants";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { AppProps } from "../../types";
import Header from "../../components/header";
import { calcRateWithUserId } from "../../utils/functions";
import { Rate } from "@prisma/client";
import { useRouter } from "next/router";
import { useAppSelector } from "../../redux/app/hookes";
import ReviewModal from "../../components/ReviewModal";

const FilmPage = ({ film }: AppProps) => {
  console.log(film)
  const [rate, setRate] = useState(0);
  const [Like, setLike] = useState(false);
  const isLoggedIn = useAppSelector((state) => state.profileSlice.isLoggedIn);
  const router = useRouter();
  const [Show, setShow] = useState(false);
  useEffect(() => {
    console.log(rate);
  }, [rate]);
  return (
    <div className="bgcolor min-h-screen">
      <div
        className="filmbg"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w780/${film?.coverPath})`,
        }}
      >
        <div className="bg-wraper2">
          <Header />
        </div>
      </div>
      <div className="flex mx-auto px-6 max-w-7xl  sm:px-6 lg:px-8 gap-20 pb-5">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w780/${film?.profilePath}`}
            alt="film"
            width={700}
          />
        </div>

        <div>
          <h1 className="font-extrabold text-xl sm:text-2xl text-white">
            {film?.name}
          </h1>
          <p className="pt-5 text-gray-400">WELCOME TO {film?.name}.</p>
          <p className="pt-5 text-gray-400">{film?.description}.</p>
        </div>
      </div>
      <div className="flex justify-end items-end p-10 ">
        <div>
          <div>
            <h3 className="text-lg font-medium text-gray-600">
              Share your thoughts
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              If you’ve watched this film, share your thoughts with other people
            </p>
          </div>
          {!isLoggedIn ? (
            <div onClick={() => router.push("/signin")}>
              <span className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-600 bg-gray-600 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-300 sm:w-auto lg:w-full">
                Sign in to Write a review
              </span>
            </div>
          ) : (
            <div className="border border-gray-600 bg-gray-600">
              <div className="flex w-full items-center justify-center border-b border-gray-900 py-2 cursor-pointer  text-sm font-medium text-gray-300 sm:w-auto lg:w-full">
                <div>
                  <div className="flex" onClick={() => setLike(!Like)}>
                    <HeartIcon
                      className={classNames(
                        Like ? "text-red-900" : "text-gray-200",
                        "hover:text-red-900 text-gray-200",
                        "flex-shrink-0 h-10 w-10 ml-2 "
                      )}
                      aria-hidden="true"
                    />
                  </div>
                  <p>Favourite</p>
                </div>
              </div>
              <div className="flex w-full items-center justify-center border-b border-gray-900 py-2  text-sm font-medium text-gray-300 sm:w-auto lg:w-full">
                <div>
                  <p className="text-center">Rate</p>
                  <div
                    className="flex items-center"
                    onClick={() => {
                      setRate(rate + 1);
                    }}
                  >
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          rate > rating ? "text-yellow-400" : "text-gray-200",
                          "hover:text-yellow-400",
                          "flex-shrink-0 h-10 w-10"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="flex w-full items-center justify-center py-2  cursor-pointer text-sm font-medium text-gray-300 sm:w-auto lg:w-full hover:text-gray-100"
                onClick={() => setShow(true)}
              >
                <span>Review</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mx-auto  max-w-7xl px-6  sm:px-6 lg:px-8 lg:gap-20 pb-5 pt-10">
        <h3 className="text-gray-500 pb-3">POPULAR REVIEWS</h3>

        <div>
          <div className="divide-y divide-gray-200">
            {film?.raviews.map((review) => (
              <div key={review.id} className="py-12">
                <div className="flex items-center">
                  <img
                    src={`${
                      review.user?.imageUrl
                        ? review.user.imageUrl
                        : "https://gdbgnlodeaeojoowuqoc.supabase.co/storage/v1/object/sign/images/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvMzYwX0ZfMzQ2ODM5NjgzXzZuQVB6YmhwU2tJcGI4cG1Bd3Vma0M3YzVlRDd3WXdzLmpwZyIsImlhdCI6MTY2NjczODk5NiwiZXhwIjoxOTgyMDk4OTk2fQ.m8DMrMAaUazk13SE5o18af1ECIG400iofEsZ_M3_Jvk"
                    }`}
                    alt="Profile"
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="ml-4">
                    <Link href={`/members/${review.id}`}>
                      <a className="text-sm font-bold text-gray-400">
                        {review.user?.fullName}
                      </a>
                    </Link>
                    <div className="mt-1 flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            calcRateWithUserId(film.rates, review.user?.id!) >
                              rating
                              ? "text-yellow-400"
                              : "text-gray-300",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  className="mt-4 space-y-6 text-base italic text-gray-400"
                  dangerouslySetInnerHTML={{ __html: review.text }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {Show ? (
        <ReviewModal
          film={film}
          setShow={setShow}
          rate={rate}
          setRate={setRate}
          Like={Like}
          setLike={setLike}
          id={film?.id}
        />
      ) : null}
    </div>
  );
};
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.filmId;
  const film = await prisma.film.findFirst({
    where: { id: +id! },
    include: {
      raviews: { include: { user: true } },
      rates: true
    },
  });
  return { props: { film } };
};

export default FilmPage;
