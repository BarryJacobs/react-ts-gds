export interface Movie {
  name: string
  synopsis: string
}

export const movies: Movie[] = [
  {
    name: "Apocalypse Now",
    synopsis:
      "A masterful, thought-provoking, pretentious film, with beautifully-chaotic visuals, about the nightmarish, moral madness of the Vietnam War, inspired by the novella Heart of Darkness by Joseph Conrad."
  },
  {
    name: "Blade Runner",
    synopsis:
      "Moody futuristic, sci-fi noirish thriller, with stunning, visually-dazzling effects and a brooding atmosphere, about a hard-boiled detective hunting near-human replicants. Based on the novel Do Androids Dream of Electric Sheep? by Philip K. Dick."
  },
  {
    name: "The Shawshank Redemption",
    synopsis:
      "An uplifting, engrossing, life-affirming drama/prison tale about the relationship between two jailed prisoners, adapted from a Stephen King novella titled Rita Hayworth and Shawshank Redemption."
  }
]
