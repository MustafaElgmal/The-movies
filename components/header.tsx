/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { classNames, navItems, navItems2 } from "../constants";
import Link from "next/link";
import { handelClick, handelClick2 } from "../utils/functions";
import { getUserProfile } from "../utils/apis";
import { useAppSelector } from "../redux/app/hookes";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { removeProfile } from "../redux/features/profileSlice";
export default function Header() {
  const [items, setItems] = useState(navItems);
  const [items2, setItems2] = useState(navItems2);
  const profile = useAppSelector((state) => state.profileSlice.profile);
  const isLoggedIn = useAppSelector((state) => state.profileSlice.isLoggedIn);
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    async function getUserData() {
      await supabaseClient.auth.getUser().then(async (value: any) => {
        if (value.data.user) {
          await getUserProfile(value.data.user.id, dispatch);
        }
      });
    }
    getUserData();
  }, []);
  return (
    <>
      {!isLoggedIn ? (
        <Disclosure as="nav" className="w-full">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <Link href="/">
                      <a className="text-2xl font-bold uppercase txt">
                        The End
                      </a>
                    </Link>

                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex space-x-4">
                        {items.map((item) => (
                          <Link href={item.href} key={`${item.name}`}>
                            <a
                              className={`${
                                !item.active
                                  ? "uppercase rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                  : "uppercase rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                              }`}
                              onClick={() => handelClick(item.name, setItems)}
                            >
                              {item.name}
                            </a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="-mr-2 flex sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 bg-black">
                  {items.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <Disclosure.Button
                        className={`${
                          !item.active
                            ? " uppercase block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                            : "uppercase block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                        }`}
                      >
                        {item.name}
                      </Disclosure.Button>
                    </Link>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ) : (
        <Disclosure as="nav" className="w-full">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <Link href="/">
                      <a className="text-2xl font-bold uppercase txt">
                        The End
                      </a>
                    </Link>

                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex space-x-4">
                        {items2.map((item) => (
                          <Link href={item.href} key={`${item.name}`}>
                            <a
                              className={`${
                                !item.active
                                  ? "uppercase rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                  : "uppercase rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                              }`}
                              onClick={() => handelClick2(item.name, setItems2)}
                            >
                              {item.name}
                            </a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:block ">
                    <div className="flex items-center">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div className="flex space-x-2">
                          <div className="text-gray-300 text-lg font-medium">
                            {profile.fullName}
                          </div>
                          <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                              src={`${
                                profile.imageUrl
                                  ? profile.imageUrl
                                  : "https://gdbgnlodeaeojoowuqoc.supabase.co/storage/v1/object/sign/images/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvMzYwX0ZfMzQ2ODM5NjgzXzZuQVB6YmhwU2tJcGI4cG1Bd3Vma0M3YzVlRDd3WXdzLmpwZyIsImlhdCI6MTY2NjczODk5NiwiZXhwIjoxOTgyMDk4OTk2fQ.m8DMrMAaUazk13SE5o18af1ECIG400iofEsZ_M3_Jvk"
                              }`}
                              alt="Profile"
                              className="h-8 w-8 rounded-full "
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              <p
                                className="block px-4 py-2 text-sm text-white hover:text-white hover:bg-gray-700 cursor-pointer"
                                onClick={() => router.push(`/members/profile`)}
                              >
                                Your Profile
                              </p>
                            </Menu.Item>

                            <Menu.Item>
                              <p
                                className="block px-4 py-2 text-sm text-white hover:text-white hover:bg-gray-700 cursor-pointer"
                                onClick={async () => {
                                  await supabaseClient.auth.signOut();
                                  dispatch(removeProfile());
                                  router.push("/");
                                }}
                              >
                                Sign out
                              </p>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 bg-black">
                  {items2.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <Disclosure.Button
                        className={`${
                          !item.active
                            ? " uppercase block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                            : "uppercase block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                        }`}
                      >
                        {item.name}
                      </Disclosure.Button>
                    </Link>
                  ))}
                </div>
                <div className="border-t border-gray-700 pt-4 pb-3 bg-black">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        src={`${
                          profile.imageUrl
                            ? profile.imageUrl
                            : "https://gdbgnlodeaeojoowuqoc.supabase.co/storage/v1/object/sign/images/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvMzYwX0ZfMzQ2ODM5NjgzXzZuQVB6YmhwU2tJcGI4cG1Bd3Vma0M3YzVlRDd3WXdzLmpwZyIsImlhdCI6MTY2NjczODk5NiwiZXhwIjoxOTgyMDk4OTk2fQ.m8DMrMAaUazk13SE5o18af1ECIG400iofEsZ_M3_Jvk"
                        }`}
                        alt="Profile"
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-400">
                        {profile.fullName}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    <Link href={`/members/${profile.id}`}>
                      <a className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                        Your Profile
                      </a>
                    </Link>

                    <p
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      onClick={async () => {
                        await supabaseClient.auth.signOut();
                        dispatch(removeProfile());
                        router.push("/");
                      }}
                    >
                      {" "}
                      Sign out
                    </p>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      )}
    </>
  );
}
