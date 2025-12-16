//main types
export type SliderObject = {
  id: number,
  rating: number,
  title: string,
  imageLink: string,
}
export type SliderGroup = {
  id: number, 
  sliderObjects: SliderObject[]
}
export type Section = {
  id: number,
  caption: Caption,
  games: GameInfo[]
}
export type Caption = {
  title: string,
  link: string
}
//header types
export type Hint = {
  id: number,

  title: string,

  roots?: Map<string, string>// 0 - title , 1 -root
}
// steam api
// Original Name is Data
export type GameInfo = {
  type: string
  name: string
  metacritic: Metacritic
  is_free: boolean
  dlc?: number[]
  detailed_description?: string
  about_the_game?: string
  short_description: string
  supported_languages: string
  header_image: string
  capsule_image: string
  developers: string[]
  publishers: string[]
  platforms: Platforms
  price_overview: Price[],
  categories: Category[]
  genres: Genre[]
  screenshots: Screenshot[]
  release_date: ReleaseDate
  ratings: Ratings
}
export type Price = {
    final_formatted: string
}
// Platform support
export type Platforms = {
  windows: boolean
  mac: boolean
  linux: boolean
}

export type Category = {
  id: number
  description: string
}

export type Genre = {
  id: string
  description: string
}
export type Metacritic = {
  score: number
}

export type Screenshot = {
  id: number
  path_thumbnail: string
  path_full: string
}

export type ReleaseDate = {
  coming_soon: boolean
  date: string
}

export type SupportInfo = {
  url: string
  email: string
}

export type Ratings = {
  usk?: Usk
  agcom?: Agcom
  cadpa?: Cadpa
  dejus?: Dejus
  steam_germany: SteamGermany
}

export type Usk = {
  rating: string
  descriptors: string
}

export type Agcom = {
  rating: string
  descriptors: string
}

export type Cadpa = {
  rating: string
}

export type Dejus = {
  rating: string
  descriptors: string
}

export type SteamGermany = {
  rating_generated: string
  rating: string
  required_age: string
  banned: string
  use_age_gate: string
  descriptors: string
}