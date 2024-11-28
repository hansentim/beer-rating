export interface UserRating {
  beer_id: number;
  rating: number;
  user_name: string;
}

export interface BeerResult {
  beerId: number;
  averageRating: number;
  totalRatings: number;
}
