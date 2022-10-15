export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const navItems = [
  { name: "signin", href: "/signin", active: false },
  { name: "create account", href: "/signup", active: false },
  { name: "films", href: "/films", active: false },
  { name: "members", href: "/members", active: false },
];
export const films = [
  {
    id: 1,
    name: "Organize Basic Set (Walnut)",
    rating: 5,
    reviewCount: 38,
    imageSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQgljUQobD5ZFK_Y5m1WL_krDO2gyMEtQk6A&usqp=CAU",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 2,
    name: "Organize Pen Holder",
    rating: 5,
    reviewCount: 18,
    imageSrc:
      "https://s01.sgp1.digitaloceanspaces.com/large/838382-59879-umeuqjfelh-1496650698.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 3,
    name: "Organize Sticky Note Holder",

    rating: 5,
    reviewCount: 14,
    imageSrc:
      "https://m.media-amazon.com/images/M/MV5BNGQ1MzY1YTctYWVjNS00YmJjLTlhNDEtN2FjYzFiOGJjYzc2XkEyXkFqcGdeQXVyMTA5NjcyMTU1._V1_FMjpg_UX1000_.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 4,
    name: "Organize Phone Holder",

    rating: 4,
    reviewCount: 21,
    imageSrc:
      "https://global-uploads.webflow.com/5e95052cfabd4e155de8a3cf/62f53a2d149a09d1b4c86d1c_bowie%20poster.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  // More films...
];
