import { User } from "@prisma/client";
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

export const generateNumber=()=>{
  const min=1,max=100
  const randomNumber =  Math.floor(Math.random() * (max - min + 1)) + min
  return randomNumber
}

export const generateIndex=()=>{
  const min=1,max=15
  const randomNumber =  Math.floor(Math.random() * (max - min + 1)) + min
  return randomNumber
}




