/* eslint-disable @next/next/no-img-element */
import { HeartIcon, StarIcon } from "@heroicons/react/20/solid";
import React from "react";
import { classNames } from "../constants";
import { AppProps } from "../types";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAppSelector } from "../redux/app/hookes";
import { addFavoriteFilms, addRating, addReview } from "../utils/apis";

const ReviewModal = ({
  film,
  setShow,
  rate,
  setRate,
  Like,
  setLike,
  id,
}: AppProps) => {
  const profile = useAppSelector((state) => state.profileSlice.profile);
  const formik = useFormik({
    initialValues: {
      review: "",
    },
    validationSchema: Yup.object({
      review: Yup.string().required("This field is required!"),
    }),
    onSubmit: async (values) => {
      await addReview(film?.id!, { text: values.review, userId: profile.id });
      await addRating(film?.id!, { star: rate!, userId: profile.id });
      await addFavoriteFilms({ filmId: film?.id!, userId: profile.id });
      formik.resetForm();
      setShow && setShow(false);
    },
  });

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto ">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
          <div className="relative transform overflow-hidden rounded-lg bg-gray-600 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 ">
            <div className="absolute top-0 right-0 pt-4 pr-4 ">
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
                onClick={() => setShow && setShow(false)}
              >
                <span className="sr-only">Close</span>

                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="sm:flex sm:items-start">
              <div
                className=" filmbg mx-auto flex h-20 w-20 flex-shrink-0 items-center justify-center bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w780/${film?.coverPath})`,
                }}
              ></div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg font-medium leading-6 text-gray-100"
                  id="modal-title"
                >
                  I WATCHED…
                </h3>
                <h3
                  className="text-lg font-medium leading-6 text-gray-100"
                  id="modal-title"
                >
                  {film?.name}
                </h3>
                <form>
                  <div>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <textarea
                        name="review"
                        value={formik.values.review}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="review"
                        className="block w-full rounded-md border-gray-600 pr-10 text-red-900 placeholder-gray-300 focus:border-gray-600 focus:outline-none focus:ring-gray-600 sm:text-sm"
                        placeholder="Add Review"
                        aria-invalid="true"
                        aria-describedby="email-error"
                      />
                      {formik.touched.review && formik.errors.review ? (
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <svg
                            className="h-5 w-5 text-red-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      ) : null}
                    </div>
                    {formik.touched.review && formik.errors.review ? (
                      <p className="mt-2 text-sm text-red-600" id="email-error">
                        {formik.errors.review}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex justify-between gap-10 pt-5">
                    <div>
                      <div className="flex justify-between">
                        <p className="text-gray-100">Rating</p>
                        <p className="text-gray-900">3 out of 5</p>
                      </div>
                      <div
                        className="flex"
                        onClick={() => setRate && setRate(rate! + 1)}
                      >
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              rate! > rating
                                ? "text-yellow-400"
                                : "text-gray-200",
                              "hover:text-yellow-400",
                              "flex-shrink-0 h-10 w-10"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-100">Favourite</p>
                      <div onClick={() => setLike && setLike(!Like)}>
                        <HeartIcon
                          className={classNames(
                            Like ? "text-red-900" : "text-gray-200",
                            "hover:text-red-900 text-gray-200",
                            "flex-shrink-0 h-10 w-10 "
                          )}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className=" btn inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => formik.handleSubmit()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
