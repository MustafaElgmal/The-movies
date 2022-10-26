export const Base_Url="https://api.themoviedb.org/3"
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

export const  reviews = {
  average: 4,
  totalCount: 1624,
  counts: [
    { rating: 5, count: 1019 },
    { rating: 4, count: 162 },
    { rating: 3, count: 97 },
    { rating: 2, count: 199 },
    { rating: 1, count: 147 },
  ],
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 2,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 3,
      rating: 2,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 4,
      rating: 3,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
};
