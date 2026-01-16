//main types
export type User = {
  id: number;
  info?: SimpleUserInfo;
  imgPath?: string;
  likeGames?: GameInfo[];
  recentSeeGames?: GameInfo[];
};
// it for user input component
export type SimpleUserInfo = {
  location: string;
  firstname: string;
  lastname: string;
  age: number;
  mail: string;
};

export type Section = {
  id: number;
  caption?: Caption;
  games?: GameInfo[];
};
export type Caption = {
  title: string;
  link: string;
};
//header types
export type Hint = {
  id: number;

  title: string;

  roots?: Map<string, string>; // 0 - title , 1 -root
};
// steam api
// Original Name is Data
export type GameInfo = {
  id: number;
  type: string;
  name: string;
  metacritic: Metacritic;
  is_free: boolean;
  dlc?: number[];
  detailed_description?: string;
  about_the_game?: string;
  short_description: string;
  supported_languages: string;
  header_image: string;
  capsule_image: string;
  developers: string[];
  publishers: string[];
  platforms: Platforms;
  price_overview: Price[];
  categories: Category[];
  genres: Genre[];
  screenshots: Screenshot[];
  release_date: ReleaseDate;
  ratings: Ratings;
};
export type Price = {
  final_formatted: string;
};
// Platform support
export type Platforms = {
  windows: boolean;
  mac: boolean;
  linux: boolean;
};

export type Category = {
  id: number;
  description: string;
};

export type Genre = {
  id: string;
  description: string;
};
export type Metacritic = {
  score: number;
};

export type Screenshot = {
  id: number;
  path_thumbnail: string;
  path_full?: string;
};

export type ReleaseDate = {
  coming_soon: boolean;
  date: string;
};

export type SupportInfo = {
  url: string;
  email: string;
};

export type Ratings = {
  usk?: Usk;
  agcom?: Agcom;
  cadpa?: Cadpa;
  dejus?: Dejus;
  steam_germany: SteamGermany;
};

export type Usk = {
  rating: string;
  descriptors: string;
};

export type Agcom = {
  rating: string;
  descriptors: string;
};

export type Cadpa = {
  rating: string;
};

export type Dejus = {
  rating: string;
  descriptors: string;
};

export type SteamGermany = {
  rating_generated: string;
  rating: string;
  required_age: string;
  banned: string;
  use_age_gate: string;
  descriptors: string;
};
export type SliderGameObject = {
  game: GameInfo;
} & SliderObject;
export type SliderScreenObject = {
  screen: Screenshot;
} & SliderObject;
export type SliderObject = {
  id: number;
  imageLink?: string;
};
export type SliderGroup<T extends SliderObject> = {
  id: number;
  sliderObjects: T[];
};
export const RATINGS_COLORS = {
  GOOD: '#0BFF38',
  BAD: '#D8000C',
  MIDDLE: '#FFC659',
};
// auth
export type UserLoginRequest = {
  email: string;
  password: string;
};
export type UserLoginResponce = {
  accessToken: string;
  refreshToken: string;
};
export type UserRegisterRequest = UserLoginRequest & {
  name: string;
};
export type OAuth2Type = {
  provider: string;
  logoLink: string;
};
