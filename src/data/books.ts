export interface Book {
  title: string
  author: string
  summary: string
}

export const books: Book[] = [
  {
    title: "Heart of Darkness",
    author: "Joseph Conrad",
    summary:
      "The story details an incident when Marlow, an Englishman, took a foreign assignment from a Belgian trading company as a ferry-boat captain in Africa."
  },
  {
    title: "The Odyssey",
    author: "Homer",
    summary:
      "The Odyssey is one of two major ancient Greek epic poems attributed to Homer. It is, in part, a sequel to the Iliad, the other work traditionally ascribed to Homer."
  },
  {
    title: "War and Peace",
    author: "Leo Tolstoy",
    summary:
      "Epic in scale, War and Peace delineates in graphic detail events leading up to Napoleon's invasion of Russia, and the impact of the Napoleonic era on Tsarist society, as seen through the eyes of five Russian aristocratic families."
  }
]
