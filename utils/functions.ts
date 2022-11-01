import { userType } from "./../types";
import { FavoriteCategory, Follower, Rate, User } from "@prisma/client";
import { navItems, navItems2 } from "./../constants/index";

export const handelClick = (name: string, setItems: Function) => {
  const items = navItems.map((item) =>
    item.name === name ? { ...item, active: true } : { ...item, active: false }
  );
  setItems(items);
};

export const handelClick2 = (name: string, setItems: Function) => {
  const items = navItems2.map((item) =>
    item.name === name ? { ...item, active: true } : { ...item, active: false }
  );
  setItems(items);
};

export const generateNumber = () => {
  const min = 1,
    max = 100;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

export const generateIndex = () => {
  const min = 1,
    max = 15;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

export const getReconebdedUsers = (
  members: userType[],
  setUsers: Function,
  favoriteCategories: FavoriteCategory[],
  userId: string
) => {
  const users: userType[] = [];
  if (favoriteCategories.length === 0) {
    if (members.length > 5) {
      for (let j = 0; j < 5; j++) {
        if (members[j].id !== userId) {
          users.push(members[j]);
        }
      }
    } else {
      for (let j = 0; j < members.length; j++) {
        if (members[j].id !== userId) {
          users.push(members[j]);
        }
      }
    }
  } else {
    for (let i = 0; i < members.length; i++) {
      for (let j = 0; j < favoriteCategories.length; j++) {
        if (members[i].favoriteCategories?.includes(favoriteCategories[j])) {
          if (members[i].id !== userId) {
            users.push(members[i]);
          }
        }
      }
    }
  }
  setUsers(users);
};

export const calcRate = (filmRateS: Rate[]) => {
  let sum: number = 0;
  for (let i = 0; i < filmRateS.length; i++) {
    sum += filmRateS[i].star;
  }
  return sum / filmRateS.length;
};

export const updateFollowButton = (
  followers: Follower[],
  profileId: string,
  setIsFollow: Function
) => {
  let isFollow = false;
  followers.forEach((follower) =>
    follower.followerId === profileId ? (isFollow = true) : isFollow
  );
  setIsFollow(isFollow);
};

export const calcRateWithUserId = (filmRates: Rate[], userId: string) => {
  const rate = filmRates.find((rate) => rate.userId === userId);
  if (!rate) return 0;
  return rate.star;
};
