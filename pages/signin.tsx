/* eslint-disable @next/next/no-img-element */
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import * as Yup from "yup";
import {
  createUserWithFacebook,
  createUserWithGoogle,
  signInUser,
} from "../utils/apis";

export default function SignIn() {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is not vaild!")
        .required("Email is required!"),
      password: Yup.string().required("Password is required!"),
    }),
    onSubmit: async (values) => {
      await signInUser(values, router, supabaseClient);
      formik.resetForm();
    },
  });
  return (
    <div className="flex min-h-screen bgcolor">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight txt">
              Welcome Back!
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Or{" "}
              <Link href="/signup">
                <a className="font-medium  hover:text-gray-100">
                  Create a new account
                </a>
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div>
              <div>
                <p className="text-sm font-medium text-gray-400 pb-3">
                  Sign in with
                </p>

                <div className="mt-1 grid grid-cols-2 gap-3">
                  <div>
                    <div
                      onClick={async () => await createUserWithFacebook(router)}
                      className="inline-flex w-full justify-center cursor-pointer rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign in with Facebook</span>
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.19765 21.5H13.1976V13.4901H16.8018L17.1976 9.50977H13.1976V7.5C13.1976 6.94772 13.6454 6.5 14.1976 6.5H17.1976V2.5H14.1976C11.4362 2.5 9.19765 4.73858 9.19765 7.5V9.50977H7.19765L6.80176 13.4901H9.19765V21.5Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <div
                      onClick={async () => await createUserWithGoogle(router)}
                      className="inline-flex w-full justify-center cursor-pointer rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign in with Gmail</span>
                      <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative mt-6">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="btn px-2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-400 pb-3"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-800 focus:outline-none focus:ring-red-800 sm:text-sm"
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <p className="text-red-600">{formik.errors.email}</p>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-400 pb-3"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-red-800 focus:outline-none focus:ring-red-800 sm:text-sm"
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <p className="text-red-600">{formik.errors.password}</p>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-gray-400 pb-3
                      
                      hover:text-gray-100 "
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    className="flex w-full justify-center rounded-md border border-transparent btn py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                    onClick={() => formik.handleSubmit()}
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://gdbgnlodeaeojoowuqoc.supabase.co/storage/v1/object/public/images/corina-rainer-P2wLo_PzHjU-unsplash%20(1).jpg"
          alt=""
        />
      </div>
    </div>
  );
}
