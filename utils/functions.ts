import { User } from "@prisma/client";
import { navItems } from "./../constants/index";

export const handelClick = (name: string, setItems: Function) => {
  const items = navItems.map((item) =>
    item.name === name ? { ...item, active: true } : { ...item, active: false }
  );
  setItems(items);
};




