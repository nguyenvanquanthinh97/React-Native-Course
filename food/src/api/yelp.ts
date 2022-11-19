import axios from "axios";

export interface Category {
  alias: string;
  title: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location {
  address1: string;
  address2: string;
  address3: string;
  city: string;
  zip_code: string;
  country: string;
  state: string;
}

export interface Business {
  rating: number;
  price: string;
  phone: string;
  id: string;
  alias: string;
  is_closed: boolean;
  categories: Category[];
  review_count: number;
  name: string;
  url: string;
  coordinates: Coordinates;
  image_url: string;
  location: Location;
  distance: number;
  transactions: string[];
}

export interface Center {
  latitude: number;
  longitude: number;
}

export interface Region {
  center: Center;
}

export interface Open {
  is_overnight: boolean;
  start: string;
  end: string;
  day: number;
}

export interface Hour {
  open: Open[];
  hours_type: string;
  is_open_now: boolean;
}

export interface SpecialHour {
  date: string;
  is_closed?: any;
  start: string;
  end: string;
  is_overnight: boolean;
}

export interface YelpSearchResponse {
  total: number;
  businesses: Business[];
  region: Region;
}

export interface YelpSearchDetailResponse {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_claimed: boolean;
  is_closed: boolean;
  url: string;
  phone: string;
  display_phone: string;
  review_count: number;
  categories: Category[];
  rating: number;
  location: Location;
  coordinates: Coordinates;
  photos: string[];
  price: string;
  hours: Hour[];
  transactions: any[];
  special_hours: SpecialHour[];
}

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    // @ts-ignore
    Authorization: `Bearer ${process.env["api_key"]}`,
  },
});
