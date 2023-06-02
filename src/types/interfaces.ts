import { Gender } from './enums';

export type IPeople = {
  name: string;
  birth_year: string;
  gender: Gender;
  eye_color: string;
  hair_color: string;
  skin_color: string;
  height: string;
  mass: string;
  homeworld: string; // URL of planet
  films: Array<string>; // URLs of films
  species: Array<string>; // URLs of species
  starships: Array<string>; // URLs of starships
  vehicles: Array<string>; // URLs of vehicles
  url: string; // own url for fetching
};

export type IFilm = {
  title: string;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  url: string;
};

export type IVehicle = {
  name: string;
  model: string;
  vehicle_class: string;
  length: string;
};

export type IStarships = {
  name: string;
  model: string;
  vehicle_class: string;
  length: string;
  starship_class: string;
};
