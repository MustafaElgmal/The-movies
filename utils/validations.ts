import { UserCreate } from "./../types";
import validator from "validator";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
export const UserValidation = async (user: UserCreate) => {
  const errors: { message: string }[] = [];
  const { id, fullName, email, password } = user;
  if (!id) {
    errors.push({ message: "Id is required!" });
  } else {
    if (typeof id !== "string") {
      errors.push({ message: "Id Must be string!" });
    }
  }
  if (!fullName) {
    errors.push({ message: "FullName is required!" });
  }
  if (!email) {
    errors.push({ message: "Email is required!" });
  } else {
    if (!validator.isEmail(email)) {
      errors.push({ message: "Email is not vaild!" });
    }
    const user = await prisma.user.findFirst({ where: { email } });
    if (user) {
      errors.push({ message: "Email is Already exists!" });
    }
  }
  if (!password) {
    errors.push({ message: "Password is required!" });
  } else {
    if (!validator.isStrongPassword(password)) {
      errors.push({
        message:
          "Password should be strong like { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}!",
      });
    }
  }
  return errors;
};

export const signInValidation = async (user: {
  email: string;
  password: string;
}) => {
  const errors: { message: string }[] = [];
  const { email, password } = user;
  if (!email) {
    errors.push({ message: "Email is required!" });
  } else {
    if (!validator.isEmail(email)) {
      errors.push({ message: "Email is not vaild!" });
    }
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      errors.push({ message: "Email is not exists!" });
    }
    if (!password) {
      errors.push({ message: "Password is required!" });
    }
    const vaild = await bcrypt.compare(password, user?.password!);
    if (!vaild) {
      errors.push({ message: "Password is not vaild!" });
    }
  }
  return errors;
};

export const reviewsValidation = async (review: {
  text: string;
  userId: string;
}) => {
  const errors: { message: string }[] = [];
  const { text, userId } = review;
  if (!text) {
    errors.push({ message: "Text is required!" });
  }
  if (!userId) {
    errors.push({ message: "UserId is required!" });
  } else {
    if (typeof userId !== "string") {
      errors.push({ message: "UserId must be string!" });
    }
    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (!user) {
      errors.push({ message: "user is not found!" });
    }
  }
  return errors;
};

export const followValidation = async (follow: {
  userId: string;
  followerId: string;
}) => {
  const errors: { message: string }[] = [];
  const { followerId, userId } = follow;
  if (!followerId) {
    errors.push({ message: "FollowerId is required!" });
  } else {
    if (typeof followerId !== "string") {
      errors.push({ message: "FollowerId must be string!" });
    }
    const user = await prisma.user.findFirst({ where: { id: followerId } });
    if (!user) {
      errors.push({ message: "FollowerId is not found!" });
    }
  }
  if (!userId) {
    errors.push({ message: "UserId is required!" });
  } else {
    if (typeof userId !== "string") {
      errors.push({ message: "UserId must be string!" });
    }
    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (!user) {
      errors.push({ message: "UserId is not found!" });
    }
  }
  return errors;
};

export const CategoryValidation = async (category: {
  id: number;
  name: string;
}) => {
  const { id, name } = category;
  const errors: { message: string }[] = [];
  if (!id) {
    errors.push({ message: "Id is required!" });
  } else {
    if (typeof id !== "number") {
      errors.push({ message: "Id must be number!" });
    }
  }
  if (!name) {
    errors.push({ message: "Name is required!" });
  } else {
    if (typeof name !== "string") {
      errors.push({ message: "Name must be number!" });
    }
  }
  return errors
};
