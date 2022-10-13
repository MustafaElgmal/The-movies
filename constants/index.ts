export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const navItems = [
  { name: "signin", href: "/signin", active: false },
  { name: "create account", href: "/signup", active: false },
  { name: "films", href: "/films", active: false },
  { name: "members", href: "/members", active: false },
];
